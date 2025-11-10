import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '../../../../services/database'
import { getAddressByCoinType, handleAlltokenChainFee } from '../../../../services/Helpers/CommonHelper'
import { sendEvmCoin, sendEvmToken } from '../../../../services/Helpers/EVMHelper'
import { NumberRoundFunction } from '../../../../constants/commonHelperFunctions/commonHelperFunction'
import { routes } from '../../../../constants/routes'
import { sendSolanaToken, SolanaCoinSend } from '../../../../services/Helpers/SolanaHelper'
import { sendBitcoin } from '../../../../services/Helpers/BitcoinHelper'

const useSendSummaryScreen = (props) => {
    const isDolorValue = props?.route?.params?.isDolorValue
    const enteredAmount = props?.route?.params?.enteredAmount
    const receiverAddress = props?.route?.params?.receiverAddress
    const item = props?.route?.params?.item

    const [fee, setFee] = useState(0)
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isDolorValue, enteredAmount, receiverAddress, item) {
            handleFeeofTokens()
        }
    }, [item])

    const handleFeeofTokens = async () => {
        setLoading(true)
        try {
            const activeWallet = await database.getActiveWallet();
            const selectedAddress = getAddressByCoinType(item, activeWallet)

            const response = await handleAlltokenChainFee(receiverAddress, selectedAddress, item, enteredAmount, isDolorValue)
            console.log('response:::::response', response);
            setFee(response)
            setLoading(false)
            return response

        } catch (error) {
            let userFriendlyMessage = '';

            if (error?.message?.includes('insufficient funds for gas')) {
                userFriendlyMessage = `Insufficient funds to cover the gas fees. Please ensure you have enough balance in your wallet to cover the transaction costs.`;
            } else if (error?.message?.includes('Returned error')) {
                if (error?.message?.includes('gas')) {
                    userFriendlyMessage = `You don't have enough fee`;
                } else if (error?.message?.includes('network')) {
                    userFriendlyMessage = 'Network error: Unable to connect to the blockchain network. Please check your internet connection or try again later.';
                } else {
                    userFriendlyMessage = 'An unexpected error occurred. Please try again later.';
                }
            } else if (error?.message?.includes('overshot')) {
                userFriendlyMessage = 'Transaction cost exceeds your balance. Please check your balance and try again.';
            } else if (error?.message?.includes('invalid address')) {
                userFriendlyMessage = 'The address you entered is invalid. Please check the address and try again.';
            } else if (error?.message?.includes('nonce too low')) {
                userFriendlyMessage = 'There is a nonce issue with your transaction. Please wait a moment and try again.';
            } else if (error?.message?.includes('execution reverted')) {
                userFriendlyMessage = 'Transaction failed due to a contract issue. Please check the contract and try again.'
            } else {
                userFriendlyMessage = 'An unknown error occurred. Please try again later.';
            }
            setErrorMessage(userFriendlyMessage)
            setLoading(false)

            console.log('catch error in handleFeeofTokens:', error);
            throw error
        }
    }

    const onPressSend = async () => {
        try {
            setBtnLoading(true)

            const activeWallet = await database.getActiveWallet();
            const selectedAddress = getAddressByCoinType(item, activeWallet)

            let fromAddress = selectedAddress?.address
            let fromPrivateKey = selectedAddress?.privateKey
            let receverAddress = receiverAddress?.trim()
            let amounttosend = isDolorValue ? Number(enteredAmount) / Number(item?.currentPriceUsd) : enteredAmount

            if (item?.isEvm == 1) {
                if (item?.type == 'token') {
                    console.log('handle evm token send')
                    const sendtokenResponse = await sendEvmToken(fromAddress, fromPrivateKey, amounttosend, receverAddress, item)
                    console.log('sendtokenResponse', sendtokenResponse);

                    if (sendtokenResponse) {
                        props?.navigation.navigate(routes.sendSuccess, { receiverAddress, item, amount: isDolorValue ? NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0)) : enteredAmount })
                    }
                }
                else {
                    console.log('handle evm coin send')
                    const sendcoinResponse = await sendEvmCoin(fromAddress, fromPrivateKey, amounttosend, receverAddress, item)
                    console.log('sendtokenResponse', sendcoinResponse);

                    if (sendcoinResponse) {
                        props?.navigation.navigate(routes.sendSuccess, { receiverAddress, item, amount: isDolorValue ? NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0)) : enteredAmount })
                    }
                }
            }
            else if (item?.chainName == 'Solana') {
                if (item?.type == 'token') {
                    console.log('handle solana token send')
                    const sendsolToken = await sendSolanaToken(amounttosend, fromAddress, fromPrivateKey, receverAddress, item?.tokenAddress, item?.decimals)
                    console.log('sendtokenResponse', sendsolToken);

                    if (sendsolToken) {
                        props?.navigation.navigate(routes.sendSuccess, { receiverAddress, item, amount: isDolorValue ? NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0)) : enteredAmount })
                    }
                }
                else {
                    console.log('handle solana coin send')
                    const sendSolcoin = await SolanaCoinSend(amounttosend, fromAddress, fromPrivateKey, receverAddress)
                    console.log('sendtokenResponse', sendSolcoin);

                    if (sendSolcoin) {
                        props?.navigation.navigate(routes.sendSuccess, { receiverAddress, item, amount: isDolorValue ? NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0)) : enteredAmount })
                    }
                }
            }
            else if (item?.chainName == 'bitcoin') {

                console.log('handle btc coin send')
                const setBtc = await sendBitcoin(fromPrivateKey, fromAddress, receverAddress, amounttosend)
                if (setBtc) {
                    props?.navigation.navigate(routes.sendSuccess, { receiverAddress, item, amount: isDolorValue ? NumberRoundFunction(parseFloat(enteredAmount || 0) / parseFloat(item?.currentPriceUsd || 0)) : enteredAmount })
                }
            }

        } catch (error) {

            console.log('errorerrorerror messagesss', error);
            console.log('🚨 error.type:', typeof error);
            console.log('🚨 error.message:', error?.message);

            let userFriendlyMessage = '';

            // 🌐 Normalize all possible places error messages might exist
            const rawMessage =
                typeof error === 'string' ? error :
                    error?.cause?.message ||  // ✅ catch smart contract cause
                    error?.innerError?.message || // fallback to innerError
                    error?.error ||
                    error?.data?.message ||
                    error?.response?.data?.message ||
                    error?.response?.data ||
                    error?.message ||
                    '';


            console.log('rawMessagerawMessage', rawMessage);

            const errorMessage =
                typeof rawMessage === 'string'
                    ? rawMessage.toLowerCase()
                    : typeof rawMessage?.message === 'string'
                        ? rawMessage.message.toLowerCase()
                        : '';


            console.log('errorMessageerrorMessageerrorMessage', errorMessage);

            // 🧠 Check for specific known errors
            if (errorMessage?.includes('insufficient funds for gas')) {
                userFriendlyMessage =
                    `Insufficient funds to cover the gas fee. Please ensure you have enough balance in your wallet.`;
            }
            else if (errorMessage?.includes('insufficient')) {
                userFriendlyMessage =
                    `Insufficient funds to cover the gas fee. Please ensure you have enough balance in your wallet.`;
            }
            else if (errorMessage?.includes('dust amount detected in one output')) {
                userFriendlyMessage =
                    'The minimum amount should not be less than $1';
            }
            else if (errorMessage?.includes('amount is expected to be a positive integer')) {
                userFriendlyMessage =
                    'Amount must be a positive number. Please check your input and try again.';
            } else if (errorMessage?.includes('overshot')) {
                userFriendlyMessage =
                    `Transaction cost exceeds your balance. Please top up your wallet and try again.`;
            } else if (errorMessage?.includes('invalid address')) {
                userFriendlyMessage =
                    'Network error: Unable to connect to the blockchain. Please try again later.';
            } else if (errorMessage?.includes('nonce too low')) {
                userFriendlyMessage =
                    'Transaction nonce too low. Wait a moment and try again.';
            }
            else if (errorMessage?.includes('transfer amount exceeds balance') || errorMessage?.includes('invalid opcode')) {
                userFriendlyMessage = 'Transfer failed: Your token balance is too low to complete this transaction. Please make sure you have enough tokens in your wallet.'

            }

            else if (errorMessage?.includes('exceeds balance')) {
                userFriendlyMessage = 'Transfer failed: Your token balance is too low to complete this transaction. Please make sure you have enough tokens in your wallet.'

            }
            else if (errorMessage?.includes('execution reverted')) {
                userFriendlyMessage =
                    'Transaction reverted. This may be due to contract conditions or gas issues.';
            }
            else if (errorMessage?.includes('gas')) {
                userFriendlyMessage = `You don't have enough fee to complete this transaction.`;
            }
            else if (errorMessage?.includes('returned error')) {
                if (errorMessage?.includes('Insufficient balance')) {
                    userFriendlyMessage = `You don't have enough fee to complete this transaction.`;
                } else if (errorMessage?.includes('network')) {
                    userFriendlyMessage =
                        'Network error: Unable to connect to the blockchain. Please check your internet and try again.';
                } else {
                    userFriendlyMessage = 'An unexpected blockchain error occurred. Please try again.';
                }
            }
            else {
                userFriendlyMessage =
                    'An unknown error occurred. Please check your transaction details and try again.';
            }

            console.log('⚠️ User-friendly error: 2179', userFriendlyMessage);

            setErrorMessage(userFriendlyMessage)

        }
    }

    return {
        isDolorValue,
        enteredAmount,
        receiverAddress,
        item,
        fee,
        errorMessage,
        loading,
        btnLoading,
        onPressSend,
    }
}

export default useSendSummaryScreen