import Web3 from "web3";
import { estimateBtcTransactionFee } from "./BitcoinHelper";
import { EvmCoinFeeCalculation, EvmTokenFeeCalculation } from "./EVMHelper";
import { estimateSolTransferFee } from "./SolanaHelper";
import moment from 'moment'


export const coinGekoTokenID = (chainid, tokendata) => {

    console.log('tokendatatokendatatokendatatokendata', tokendata);

    let id = ''

    if (tokendata?.chainName == "bitcoin") {
        id = "bitcoin"
    }
    else if (chainid == 1 || chainid == 42161 || chainid == 8453) {
        id = "ethereum"
    }

    else if (chainid == 56) {
        id = "binancecoin"
    }

    else if (chainid == 'solana') {
        id = "solana"
    }

    else if (chainid == 137) {
        id = "polygon-ecosystem-token"
    }

    else if (chainid == 43114) {
        id = "avalanche-2"
    }
    else if (chainid == 146) {
        id = "sonic-2"
    }

    return id
}

export const getAddressByCoinType = (item, addresses) => {

    let address = ''
    let privateKey = ''

    if (item?.isEvm == 1) {
        address = addresses?.walletAddress
        privateKey = addresses?.privateKey
    }
    else if (item?.chainName == "bitcoin") {
        address = addresses?.btcWalletAddress
        privateKey = addresses?.btcPrivateKey
    }
    else if (item?.chainName == "Solana") {
        address = addresses?.solanaWalletAddress
        privateKey = addresses?.solanaPrivateKey
    }

    return {
        address: address,
        privateKey: privateKey
    }
}

export const getChainIdByChainName = (chainName) => {

    let id = ''

    if (chainName == "bitcoin") {
        id = "bitcoin"
    }
    else if (chainName == 'Solana') {
        id = "solana"
    }
    else if (chainName == 'Ethereum') {
        id = 1
    }
    else if (chainName == 'Binance Smart Chain') {
        id = 56
    }
    else if (chainName == 'Polygon') {
        id = 137
    }
    else if (chainName == 'Avalanche') {
        id = 43114
    }
    else if (chainName == 'Arbitrum') {
        id = 42161
    }
    else if (chainName == 'Base') {
        id = 8453
    }

    return id
}

export const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function transformArray(array) {
    let result = [];

    array.forEach(item => {
        Object.keys(item.platforms).forEach(platform => {
            result.push({
                id: item.id,
                name: item.name,
                platformsaddress: item.platforms[platform],
                Platfromname: platform,
                symbol: item.symbol
            });
        });
    });

    return result;
}

export const calculateTotalBalance = arrayOfObjects => {
    // Ensure the input is an array
    if (!Array.isArray(arrayOfObjects)) {
        throw new Error('Input must be an array of objects');
    }

    // Initialize total balance
    let totalBalance = 0;

    // Loop through each object in the array
    arrayOfObjects.forEach(obj => {
        // Ensure the object has the required properties
        if (obj.currentPriceUsd !== undefined && obj.balance !== undefined) {
            // Multiply currentPrice with balance and add to total balance
            totalBalance += Number(obj.currentPriceUsd) * Number(obj.balance);
        } else {
        }
    });
    return totalBalance;
};

export const handleAlltokenChainFee = (recipientAddress, activeWallet, selectedToken, enteredAmount, isDolorValue) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('recipientAddress, activeWallet, selectedToken, enteredAmount, isDolorValue', { recipientAddress, activeWallet, selectedToken, enteredAmount, isDolorValue });

            let fromAddress = activeWallet?.address
            let receverAddress = recipientAddress
            let amounttosend = enteredAmount

            if (selectedToken?.isEvm == 1) {
                if (selectedToken?.type == 'token') {
                    const tokenFee = await EvmTokenFeeCalculation(selectedToken, receverAddress, fromAddress, amounttosend, isDolorValue)
                    console.log('handle evm token feee', tokenFee)
                    resolve(tokenFee?.Fee)
                } else {
                    const coinFee = await EvmCoinFeeCalculation(selectedToken, receverAddress, fromAddress, amounttosend, isDolorValue)
                    console.log('handle evm coin feee', coinFee)
                    resolve(coinFee?.Fee)
                }
            }
            else if (selectedToken?.chainName == 'Solana') {
                if (selectedToken?.type == 'token') {
                    const solcoinFee = await estimateSolTransferFee(selectedToken, fromAddress, receverAddress, amounttosend, isDolorValue)
                    console.log('handle solana token feee', solcoinFee)
                    resolve(solcoinFee?.Fee)
                } else {
                    const solcoinFee = await estimateSolTransferFee(selectedToken, fromAddress, receverAddress, amounttosend, isDolorValue)
                    console.log('handle solana coin feee', solcoinFee)
                    resolve(solcoinFee?.Fee)
                }
            } else if (selectedToken?.chainName == 'bitcoin') {
                const btcfee = await estimateBtcTransactionFee(selectedToken, fromAddress, amounttosend, isDolorValue)
                console.log('handle btc feee', btcfee)
                resolve(btcfee?.Fee)
            }

            console.log({ receverAddress, activeWallet, selectedToken, enteredAmount });

        } catch (error) {
            reject(error)
            console.log('catch error in handleAlltokenChainFee:', error);
        }
    })
}


export const setAllEtherTransectionData = (result, previousData) => {
    try {
        console.log('resultresultresult', result);
        console.log('resultresultresult:::previousData', previousData);

        let obj = [];
        let array = [];
        result?.map(async item => {
            if (item.value > 0) {


                var etherwithdrawamount1 = Web3.utils.fromWei(
                    item?.value?.toString(),
                    'ether',
                );
                const totalprice = item.gasPrice * item.gasUsed;
                const fee = totalprice / Math.pow(10, 18);
                obj = {
                    value: etherwithdrawamount1,
                    to: item?.to,
                    from: item?.from,
                    hash: item?.hash,
                    fee: fee,
                    timeStamp: moment.unix(item.timeStamp).local(),
                    // timeStamp: moment.utc(item.timeStamp * 1000),
                    symbol: previousData?.symbol,
                    chain: previousData?.chainName,
                    functionName: item?.functionName ? item?.functionName : null,
                    rpcUrl: previousData?.rpcUrl,
                    logo: previousData?.logoURI,
                    direction: '',
                    type: ''
                };
                array.push(obj);
            }
        });
        let sortedArray = array.sort((a, b) => new Date(b?.timeStamp) - new Date(a?.timeStamp));
        return sortedArray

    } catch (error) {
        console.log('error:::setAllEtherTransectionData', previousData?.chainName, error)
    }

}

export const setAllBtcTransection = (result, previousData) => {
    try {
        let obj = [];
        let array = [];
        result?.map(async item => {
            const fee = item.fee / 100000000
            obj = {
                value: item.out[0].value / 100000000,
                to: item.out[0].addr,
                from: item.inputs[0]?.prev_out?.addr,
                hash: item.hash,
                fee: fee,
                timeStamp: moment.utc(item.time * 1000),
                symbol: previousData?.symbol,
                chain: previousData?.chainName,
                functionName: item?.functionName ? item.functionName : null,
                rpcUrl: previousData?.rpcUrl,
                logo: previousData?.logoURI,
                direction: '',
                type: ''
            };
            array.push(obj);
        });
        let sortedArray = array.sort((a, b) => b.timeStamp - a.timeStamp);
        return sortedArray
    } catch (error) {
        console.log('error', error)
    }

}


export const setAllSolanaTransection = async (result1, previousData, connection, setAllTransections, allTransections) => {
    try {

        let array = [];
        result1?.map(async item => {

            connection?.getTransaction(item.signature).then(result => {
                if (result.meta.postTokenBalances.length <= 0) {
                    let obj = {};
                    let difrence = result.meta.preBalances[0] - result.meta.postBalances[0];
                    let value = difrence / 1000000000;
                    let fee = result.meta.fee / 1000000000;

                    obj = {
                        value: value,
                        to: result.transaction.message.accountKeys[1].toBase58(),
                        from: result.transaction.message.accountKeys[0].toBase58(),
                        hash: item.signature,
                        fee: fee,
                        timeStamp: moment.unix(result.blockTime * 1000).local(),
                        symbol: previousData?.symbol,
                        chain: previousData?.chainName,
                        // functionName: item?.functionName ? item.functionName : null,
                        rpcUrl: previousData?.rpcUrl,
                        logo: previousData?.logoURI,
                        direction: '',
                        type: ''
                    };
                    // setAllTransections(totalTransaction => [
                    //     ...totalTransaction,
                    //     obj,
                    // ]);
                }

            })

        });
        let sortedArray = array.sort((a, b) => b.timeStamp - a.timeStamp);
        return sortedArray
    } catch (error) {
        console.log('error', error)
    }
}

export const setAllTransectionData = (result, previousData) => {

    try {
        let obj = [];
        let array = [];
        result?.map(async item => {
            console.log('itemitemitemitemitemitem', item);



            const etherwithdrawamount1 = item?.value / Math.pow(10, item?.tokenDecimal)
            const totalprice = item?.gasPrice * item?.gasUsed;
            const fee = totalprice / Math.pow(10, 18);
            obj = {
                value: etherwithdrawamount1,
                to: item?.to,
                from: item?.from,
                hash: item?.hash,
                fee: fee,
                timeStamp: moment.unix(item.timeStamp).local(),
                // timeStamp: moment.utc(item.timeStamp * 1000),
                symbol: item?.tokenSymbol,
                chain: previousData?.chainName,
                functionName: item?.functionName ? item.functionName : null,
                rpcUrl: previousData?.rpcUrl,
                logo: previousData?.logoURI,
                direction: '',
                type: ''

            };
            array.push(obj);
        });
        let sortedArray = array.sort((a, b) => b?.timeStamp - a?.timeStamp);

        console.log('sortedArray', sortedArray);
        return sortedArray
    } catch (error) {
        console.log('error', error)
    }
}