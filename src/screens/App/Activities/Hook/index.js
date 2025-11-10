import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import database from '../../../../services/database'
import axios from 'axios'
import { setAllBtcTransection, setAllEtherTransectionData, setAllSolanaTransection, setAllTransectionData } from '../../../../services/Helpers/CommonHelper'
import { Connection } from '@solana/web3.js'
import * as SolanaWeb3 from '@solana/web3.js';
import moment from 'moment'

const useActivities = (props) => {

    const [activeWallet, setActiveWallet] = useState(null)
    const [loading, setLoading] = useState(false)
    const [allTransactions, setAllTransactions] = useState([])

    useEffect(() => {
        const getWallet = async () => {
            const wallet = await database.getActiveWalletsWithTokenData();
            setActiveWallet(wallet)
            getHistory(wallet)
        }
        getWallet()
    }, [])

    const getHistory = async (wallet) => {
        try {
            let tokens = wallet?.tokens

            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            let allTxs = []; // merged history

            for (const token of tokens) {
                let chainTxs = [];

                // Choose history function based on chain
                switch (token.chainName) {
                    case 'Ethereum': // Ethereum
                        chainTxs = token?.type === 'token'
                            ? await getEtherTokenTransaction(token, wallet)
                            : await getEtherTransaction(token, wallet);
                        break;
                    case 'Binance Smart Chain': // BSC
                        chainTxs = token?.type === 'token'
                            ? await getBinanceTokenTransaction(token, wallet)
                            : await getBinanceTransaction(token, wallet);
                        break;
                    case 'Arbitrum': // Arbitrum
                        chainTxs = token?.type === 'token'
                            ? await getArbitrumTokenTransaction(token, wallet)
                            : await getArbitrumTransaction(token, wallet);
                        break;
                    case 'Base': // Base
                        chainTxs = token?.type === 'token'
                            ? await getBaseTokenTransaction(token, wallet)
                            : await getBaseTransaction(token, wallet);
                        break;
                    case 'Polygon': // Polygon
                        chainTxs = token?.type === 'token'
                            ? await getPolygonTokenTransaction(token, wallet)
                            : await getPolygonTransaction(token, wallet);
                        break;
                    case 'Avalanche': // Avalanche
                        chainTxs = token?.type === 'token'
                            ? await getAvalanchTokenTransaction(token, wallet)
                            : await getAvalanchTransaction(token, wallet);
                        break;
                    case 'bitcoin': // BTC (custom)
                        chainTxs = await getBtcHistory(token, wallet);
                        break;
                    case 'Solana': // Solana (custom)
                        chainTxs = await getSolanaHistory(token, wallet);
                        break;
                    default:
                        console.log('Unsupported chain:', token.chainId);
                        break;
                }

                // merge current chain transactions
                if (Array.isArray(chainTxs) && chainTxs.length > 0) {
                    allTxs = [...allTxs, ...chainTxs];
                    // update UI progressively after each chain
                    setAllTransactions([...allTxs]);
                }
            }

            // sort final merged data by date descending
            allTxs.sort(
                (a, b) => new Date(b.timeStamp || b.date) - new Date(a.timeStamp || a.date)
            );

            const grouped = await groupTransactionsWithHeaders(allTxs)

            setAllTransactions(grouped);
        } catch (error) {
            console.log('Error in getHistory:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupTransactionsWithHeaders = (transactions) => {
        if (!Array.isArray(transactions)) return [];

        const grouped = {};

        const todayStr = moment().format('YYYY-MM-DD');
        const yesterdayStr = moment().subtract(1, 'day').format('YYYY-MM-DD');

        transactions.forEach(tx => {
            let txMoment;

            // Handle both ISO string and Unix number
            if (typeof tx.timeStamp === 'string' && tx.timeStamp.includes('T')) {
                txMoment = moment(tx.timeStamp).utc().local();
            } else {
                const timeInSeconds = Math.floor(Number(tx.timeStamp));
                const correctedTime = timeInSeconds > 9999999999 ? Math.floor(timeInSeconds / 1000) : timeInSeconds;
                txMoment = moment.unix(correctedTime).utc().local();
            }

            const txDateStr = txMoment.format('YYYY-MM-DD');

            let label;
            if (txDateStr === todayStr) {
                label = `Today – ${txMoment.format('D MMM YYYY')}`;
            } else if (txDateStr === yesterdayStr) {
                label = `Yesterday – ${txMoment.format('D MMM YYYY')}`;
            } else {
                label = txMoment.format('D MMM YYYY');
            }

            if (!grouped[label]) {
                grouped[label] = {
                    date: txMoment.toDate(),
                    transactions: []
                };
            }

            tx._parsedMoment = txMoment;
            grouped[label].transactions.push(tx);
        });

        const finalList = [];

        Object.entries(grouped)
            .sort((a, b) => b[1].date - a[1].date)
            .forEach(([label, group]) => {
                group.transactions.sort((a, b) => b._parsedMoment - a._parsedMoment);
                finalList.push({ isHeader: true, label });
                finalList.push(...group.transactions);
            });

        return finalList;
    };

    // get all ether coin transactions
    const getEtherTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=1`
            );
            let transactions = await setAllEtherTransectionData(result?.data?.result, token)
            return transactions
        } catch (error) {
            console.log('error from getEtherTransaction', error)
        }
    };

    // get all ether token transactions
    const getEtherTokenTransaction = async (token, wallet) => {
        try {
            const web3 = new Web3(token?.rpcUrl);
            const blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=1`
            );

            let filterToken = result?.data?.result?.filter(i => token?.symbol == i.tokenSymbol)
            let transactions = await setAllTransectionData(filterToken, token)
            return transactions
        } catch (error) {
            console.log('error from getEtherTokenTransaction', error)
        }
    };

    // get all binance coin transactions
    const getBinanceTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=56`
            );
            let transactions = await setAllEtherTransectionData(result?.data?.result, token)
            return transactions
        } catch (error) {
            console.log('error from getBinanceTransaction', error)
        }
    };

    // get binance token transactions
    const getBinanceTokenTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=56`
            );
            let filterToken = result?.data?.result?.filter(i => token?.symbol == i.tokenSymbol)
            let transactions = await setAllTransectionData(filterToken, token)
            return transactions
        } catch (error) {
            console.log('error from getBinanceTokenTransaction', error)
        }
    };

    // get arbitrum transactions
    const getArbitrumTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=42161`
            );
            let transactions = await setAllEtherTransectionData(result?.data?.result, token)
            return transactions
        } catch (error) {
            console.log('error from getArbitrumTransaction', error)
        }
    };

    // get arbitrum token transactions
    const getArbitrumTokenTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=42161`
            );

            let previousSymbol = token?.symbol == 'USDT' ? 'USD₮0' : token?.symbol
            let filterToken = result?.data?.result?.filter(i => previousSymbol == i.tokenSymbol)
            filterToken = filterToken?.filter(i => i?.value > 0)

            let transactions = await setAllTransectionData(filterToken, token)

            return transactions
        } catch (error) {
            console.log('error from getArbitrumTokenTransaction', error)
        }
    };

    // get base transactions
    const getBaseTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=8453`
            );
            let transactions = await setAllEtherTransectionData(result?.data?.result, token)
            return transactions
        } catch (error) {
            console.log('error from getBaseTransaction', error)
        }
    };

    // get base token transactions
    const getBaseTokenTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=8453`
            );
            let filterToken = result?.data?.result?.filter(i => token?.symbol == i.tokenSymbol)

            let transactions = await setAllTransectionData(filterToken, token)
            return transactions
        } catch (error) {
            console.log('error from getBaseTokenTransaction', error)
        }
    };


    //get polygon coin transection
    const getPolygonTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=137`
            );

            let transactions = await setAllEtherTransectionData(result?.data?.result, token)
            return transactions
        } catch (error) {
            console.log('error from getPolygonTransaction', error)
        }
    };

    // get polygon token transactions
    const getPolygonTokenTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=137`
            );

            let filterToken = result?.data?.result?.filter(i => token?.symbol == i.tokenSymbol)
            let transactions = await setAllTransectionData(filterToken, token)
            return transactions
        } catch (error) {
            console.log('error from getPolygonTokenTransaction', error)
        }
    };

    // get all avalanch transactions
    const getAvalanchTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=43114`
            );
            let transactions = await setAllEtherTransectionData(result?.data?.result, token)
            return transactions
        } catch (error) {
            console.log('error from getAvalanchTransaction', error)
        }
    };

    // get avalanch token transactions
    const getAvalanchTokenTransaction = async (token, wallet) => {
        try {
            let web3 = new Web3(token?.rpcUrl);
            var blocknumber = await web3.eth.getBlockNumber();
            const result = await axios.get(
                `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${wallet?.walletAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=43114`
            );
            let filterToken = result?.data?.result?.filter(i => token?.symbol == i.tokenSymbol)
            let transactions = await setAllTransectionData(filterToken, token)
            return transactions
        } catch (error) {
            console.log('error from getAvalanchTokenTransaction', error)
        }
    }


    // get all bitcoin Coin transactions
    const getBtcHistory = async (token, wallet) => {
        try {
            const result = await axios.get(`https://blockchain.info/rawaddr/${wallet?.btcWalletAddress}`);
            let transactions = await setAllBtcTransection(result?.data?.txs, token)
            return transactions
        } catch (error) {
            console.log('error from getBtcHistory', error)
        }
    };

    // get all solana Coin transactions
    const getSolanaHistory = async (token, wallet) => {
        try {
            const connection = new Connection('https://api.mainnet-beta.solana.com');
            const waletaddresss = new SolanaWeb3.PublicKey(wallet?.solanaWalletAddress);
            const result = await connection.getSignaturesForAddress(waletaddresss);
            if (result?.length) {
                let transactions = await setAllSolanaTransection(result, token, connection, setAllTransactions, allTransactions)
                return transactions
            }
            return []
        } catch (error) {
            console.log("error from getSolanaHistory", error)
        }
    };


    return {
        activeWallet,
        allTransactions,
        loading,
    }
}

export default useActivities