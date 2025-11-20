import { View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import { MainContainerApp } from '../../../components/MainContainer'
import { HistoryCard } from './Components'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { MainHeader } from '../../../components/MainHeader'
import { Images } from '../../../Images'
import { routes } from '../../../constants/routes'
import { ethers } from 'ethers'
import axios from 'axios'
import { Connection, PublicKey } from '@solana/web3.js'
import { colors } from '../../../constants/colors'
import database from '../../../services/database'
import { useFocusEffect } from '@react-navigation/native'

const HistoryScreen = (props) => {

  const [allTransactions, setAllTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeWallet, setActiveWallet] = useState({
    publicAddress: '',
    solanaAddress: ''
  })

  // Fetch wallet addresses from database
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getWalletAddresses = async () => {
  //       try {
  //         const wallet = await database.getWallet();
  //         if (wallet) {
  //           setActiveWallet({
  //             publicAddress: wallet.evmAddress || '',
  //             solanaAddress: wallet.solanaAddress || ''
  //           });
  //         }
  //       } catch (error) {
  //         console.log('Error fetching wallet addresses:', error);
  //       }
  //     };

  //     getWalletAddresses();
  //   }, [])
  // );

  // Helper function to format Ethereum transaction data
  const setAllEtherTransectionData = (transactions) => {
    console.log('=== setAllEtherTransectionData ===');
    console.log('Transactions count:', transactions?.length);
    console.log('ActiveWallet publicAddress:', activeWallet?.publicAddress);

    if (!transactions || transactions.length === 0) {
      console.log('No transactions found');
      return [];
    }

    return transactions.map((tx, index) => {
      try {
        const isSent = tx.from?.toLowerCase() === activeWallet?.publicAddress?.toLowerCase()
        const value = tx.value && tx.value !== '0' ? ethers.formatEther(tx.value) : '0'
        const timestamp = parseInt(tx.timeStamp) * 1000

        console.log(`Transaction ${index}:`, {
          from: tx.from,
          to: tx.to,
          value: value,
          isSent: isSent,
          hash: tx.hash
        });

        return {
          id: `eth-${tx.hash}-${index}`,
          statusLogo: isSent ? Images.receiveGreenArrow : Images.sentRedArrow,
          status: isSent ? 'Token Sent' : 'Token Received',
          amount: `${isSent ? '-' : '+'}${parseFloat(value).toFixed(6)} ETH`,
          usdValue: isSent ? '-$0.00' : '+$0.00',
          address: isSent
            ? `${tx.to?.substring(0, 3)}..${tx.to?.substring(tx.to.length - 5)}`
            : `${tx.from?.substring(0, 3)}..${tx.from?.substring(tx.from.length - 5)}`,
          timestamp: timestamp,
          date: new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          time: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          txHash: tx.hash,
          chainName: 'Ethereum',
          fullData: tx
        }
      } catch (error) {
        console.error('Error formatting transaction:', error, tx);
        return null;
      }
    }).filter(tx => tx !== null)
  }

  // Helper function to format Ethereum token transaction data
  const setAllTransectionData = (transactions) => {
    console.log('=== setAllTransectionData ===');
    console.log('Token Transactions count:', transactions?.length);
    console.log('ActiveWallet publicAddress:', activeWallet?.publicAddress);

    if (!transactions || transactions.length === 0) {
      console.log('No token transactions found');
      return [];
    }

    return transactions.map((tx, index) => {
      try {
        const isSent = tx.from?.toLowerCase() === activeWallet?.publicAddress?.toLowerCase()
        const decimals = parseInt(tx.tokenDecimal) || 18
        const value = (parseInt(tx.value) / Math.pow(10, decimals)).toFixed(6)
        const timestamp = parseInt(tx.timeStamp) * 1000

        console.log(`Token Transaction ${index}:`, {
          from: tx.from,
          to: tx.to,
          value: value,
          symbol: tx.tokenSymbol,
          isSent: isSent
        });

        return {
          id: `token-${tx.hash}-${index}`,
          statusLogo: isSent ? Images.receiveGreenArrow : Images.sentRedArrow,
          status: isSent ? 'Token Sent' : 'Token Received',
          amount: `${isSent ? '-' : '+'}${value} ${tx.tokenSymbol || ''}`,
          usdValue: isSent ? '-$0.00' : '+$0.00',
          address: isSent
            ? `${tx.to?.substring(0, 3)}..${tx.to?.substring(tx.to.length - 5)}`
            : `${tx.from?.substring(0, 3)}..${tx.from?.substring(tx.from.length - 5)}`,
          timestamp: timestamp,
          date: new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          time: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          txHash: tx.hash,
          chainName: 'Ethereum',
          fullData: tx
        }
      } catch (error) {
        console.error('Error formatting token transaction:', error, tx);
        return null;
      }
    }).filter(tx => tx !== null)
  }

  // Helper function to format Solana transaction data
  const setAllSolanaTransection = async (signatures, connection) => {
    const formattedTransactions = []

    // Fetch details for each signature (limit to first 20 for performance)
    const signaturesToFetch = signatures.slice(0, 20)

    for (const sig of signaturesToFetch) {
      try {
        const txDetails = await connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0
        })

        if (txDetails && txDetails.meta) {
          const timestamp = sig.blockTime ? sig.blockTime * 1000 : Date.now()
          const isSent = txDetails.meta.err === null && txDetails.meta.preBalances[0] > txDetails.meta.postBalances[0]

          // Calculate amount change
          const balanceChange = Math.abs(
            (txDetails.meta.postBalances[0] - txDetails.meta.preBalances[0]) / 1e9
          )

          formattedTransactions.push({
            id: `sol-${sig.signature}`,
            statusLogo: isSent ? Images.receiveGreenArrow : Images.sentRedArrow,
            status: isSent ? 'Token Sent' : 'Token Received',
            amount: `${isSent ? '-' : '+'}${balanceChange.toFixed(6)} SOL`,
            usdValue: isSent ? '-$0.00' : '+$0.00',
            address: 'Solana',
            timestamp: timestamp,
            date: new Date(timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            txHash: sig.signature,
            chainName: 'Solana',
            fullData: txDetails
          })
        }
      } catch (error) {
        console.log('Error fetching Solana transaction details:', error)
      }
    }

    return formattedTransactions
  }

  // Fetch Ethereum chain transactions
  const getEtherTransaction = async () => {
    try {
      console.log('=== Starting getEtherTransaction ===');
      console.log('Fetching from address:', activeWallet?.publicAddress);

      const provider = new ethers.JsonRpcProvider("https://eth-mainnet.public.blastapi.io")
      const blocknumber = await provider.getBlockNumber()

      console.log('Block number:', blocknumber);

      const result = await axios.get(
        `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${activeWallet?.publicAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=1`
      )

      console.log('API Response status:', result?.data?.status);
      console.log('API Response result count:', result?.data?.result?.length);

      if (result?.data?.result && Array.isArray(result.data.result)) {
        let transactions = setAllEtherTransectionData(result.data.result)
        console.log('Formatted ETH transactions count:', transactions?.length);
        return transactions
      } else {
        console.log('No valid ETH transactions in response');
        return []
      }
    } catch (error) {
      console.error('Error from getEtherTransaction:', error.message);
      return []
    }
  }

  // Fetch Ethereum token transactions
  const getEtherTokenTransaction = async () => {
    try {
      console.log('=== Starting getEtherTokenTransaction ===');
      console.log('Fetching token transactions for address:', activeWallet?.publicAddress);

      const provider = new ethers.JsonRpcProvider("https://eth-mainnet.public.blastapi.io")
      const blocknumber = await provider.getBlockNumber()

      console.log('Block number:', blocknumber);

      const result = await axios.get(
        `https://api.etherscan.io/v2/api?module=account&action=tokentx&address=${activeWallet?.publicAddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD&chainid=1`
      )

      console.log('API Response status:', result?.data?.status);
      console.log('Total token transactions:', result?.data?.result?.length);

      if (result?.data?.result && Array.isArray(result.data.result)) {
        let transactions = setAllTransectionData(result.data.result)
        console.log('Formatted token transactions count:', transactions?.length);
        return transactions
      } else {
        console.log('No valid token transactions in response');
        return []
      }
    } catch (error) {
      console.error('Error from getEtherTokenTransaction:', error.message);
      return []
    }
  }

  // Fetch Solana transactions
  const getSolanaHistory = async () => {
    try {
      console.log('=== Starting getSolanaHistory ===');
      console.log('Solana Address:', activeWallet?.solanaAddress);

      const connection = new Connection('https://api.mainnet-beta.solana.com')
      const walletAddress = new PublicKey(activeWallet?.solanaAddress)
      const result = await connection.getSignaturesForAddress(walletAddress)

      console.log('Solana signatures found:', result?.length);

      if (result?.length) {
        let transactions = await setAllSolanaTransection(result, connection)
        console.log('Formatted Solana transactions count:', transactions?.length);
        return transactions
      } else {
        console.log('No Solana transactions found');
        return []
      }
    } catch (error) {
      console.error("Error from getSolanaHistory:", error.message);
      return []
    }
  }

  // Fetch transactions for all supported chains (based on available addresses)
  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       setLoading(true)
  //       const [ethNative, ethTokens, sol] = await Promise.all([
  //         activeWallet.publicAddress ? getEtherTransaction() : Promise.resolve([]),
  //         activeWallet.publicAddress ? getEtherTokenTransaction() : Promise.resolve([]),
  //         activeWallet.solanaAddress ? getSolanaHistory() : Promise.resolve([]),
  //       ])

  //       const merged = [...(ethNative || []), ...(ethTokens || []), ...(sol || [])]
  //       const sorted = merged.sort((a, b) => b.timestamp - a.timestamp)
  //       setAllTransactions(sorted)
  //       setLoading(false)
  //     } catch (error) {
  //       console.log('error from call history function', error)
  //       setLoading(false)
  //     }
  //   }

  //   if (activeWallet.publicAddress || activeWallet.solanaAddress) {
  //     fetchHistory()
  //   }
  // }, [activeWallet])

  // Sort transactions by timestamp
  const sortedTransactions = [...allTransactions].sort((a, b) => b.timestamp - a.timestamp)


  return (
    <MainContainerApp>
      <Spacer customHeight={hp(6)} />
      <View style={{ ...styles.mainView }}>
        <MainHeader title="History" leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
        <Spacer />
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        ) : (
          <HistoryCard
            transactions={sortedTransactions}
            onPressToken={(item) => props?.navigation.navigate(routes.historyDetails, { item: item })}
          />
        )}
      </View>
    </MainContainerApp>
  )
}

export default HistoryScreen
