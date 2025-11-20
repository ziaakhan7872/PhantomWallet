import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import database, { UpdateTokenAndCoinBalance } from "../../../../services/database";
import { ethers } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";
import { Images } from '../../../../Images';
import axios from 'axios';
import { getGraphDataById } from '../../../../services/Helpers/Apis';


const useTokenDetails = (props) => {

    const previousTokenData = props?.route?.params?.tokenData;
    console.log('previousTokenData::previousTokenData', previousTokenData);


    const stakeOptionBottomSheet = useRef(null)

    const [allTransactions, setAllTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useState('1H')
    const [activeWallet, setActiveWallet] = useState({
        publicAddress: '',
        solanaAddress: ''
    })
    const [balanceModalVisible, setBalanceModalVisible] = useState(false)
    const [balanceValue, setBalanceValue] = useState(Number(previousTokenData?.balance) > 0 ? previousTokenData?.balance : '')
    const [tempBalanceValue, setTempBalanceValue] = useState(Number(previousTokenData?.balance) > 0 ? previousTokenData?.balance : '');
    const [graphData, setGraphData] = useState([{ value: 0 }]);
    const [graphLoading, setGraphLoading] = useState(false);
    const [dailyPnl, setDailyPnl] = useState({});
    // Fetch wallet addresses from database
    useFocusEffect(
        React.useCallback(() => {
            const getWalletAddresses = async () => {
                try {
                    const wallet = await database.getWallet();
                    if (wallet) {
                        setActiveWallet({
                            publicAddress: wallet.evmAddress || '',
                            solanaAddress: wallet.solanaAddress || ''
                        });
                    }
                    getGraphData(2);
                    setDailyPnl(calculateSelectedTokenPnL(previousTokenData));
                } catch (error) {
                    console.log('Error fetching wallet addresses:', error);
                }
            };

            getWalletAddresses();
        }, [])
    );

    const getGraphData = async (days) => {
        try {
            setGraphLoading(true);

            const data = await getGraphDataById(previousTokenData?.cmcId, days);
            setGraphData(data?.prices ?? []);
            setGraphLoading(false);
        } catch (error) {
            console.log('Error fetching graph data:', error);
        }
    };

    const calculateSelectedTokenPnL = (token) => {
        if (!token) {
            return {
                totalValue: 0,
                pnlAmount: 0,
                change24h: 0,
            };
        }

        const { currentPriceUsd, balance, change24h } = token;

        // 1. Current total value
        const totalValue = Number(currentPriceUsd) * Number(balance);

        // 2. Reconstruct price 24h ago
        const price24hAgo =
            Number(currentPriceUsd) / (1 + Number(change24h) / 100);

        // 3. Value 24h ago
        const value24hAgo = Number(balance) * price24hAgo;

        // 4. PnL amount
        const pnlAmount = totalValue - value24hAgo;

        return {
            totalValue,
            pnlAmount,
            change24h,
        };
    };


    const handleOpenModal = () => {
        setTempBalanceValue(balanceValue);
        setBalanceModalVisible(true);
    };

    const handleCloseModal = () => {
        setBalanceModalVisible(false);
        setTempBalanceValue(balanceValue);
    };

    const handleSaveBalance = async () => {
        // Validate that the value is a valid number (integer or float)
        const trimmedValue = tempBalanceValue.trim();
        if (trimmedValue === '' || isNaN(trimmedValue) || trimmedValue.includes(' ') || trimmedValue.includes(',')) {
            return; // Don't save invalid values
        }

        const numValue = parseFloat(trimmedValue);
        if (!isNaN(numValue) && isFinite(numValue)) {
            setBalanceValue(trimmedValue);
            setBalanceModalVisible(false);

            await UpdateTokenAndCoinBalance(trimmedValue, previousTokenData?.id);
        }
    };

    const handleBalanceChange = (text) => {
        // Only allow numbers, decimal point, and minus sign
        // Remove any characters that aren't digits, decimal point, or minus
        const cleanedText = text.replace(/[^0-9.-]/g, '');

        // Ensure only one decimal point
        const parts = cleanedText.split('.');
        const filteredText = parts.length > 2
            ? parts[0] + '.' + parts.slice(1).join('')
            : cleanedText;

        // Ensure minus sign only at the beginning
        const finalText = filteredText.replace(/(?!^)-/g, '');

        setTempBalanceValue(finalText);
    };

    function createValueGenerator() {
        let currentValue = Math.floor(Math.random() * 500) + 1; // first value

        return function getNextValue() {
            const min = Math.max(1, currentValue - 10);
            const max = Math.min(500, currentValue + 10);

            const nextValue = Math.floor(Math.random() * (max - min + 1)) + min;
            currentValue = nextValue;

            return nextValue;
        };
    }
    const getValue = createValueGenerator();




    return {
        loading,
        previousTokenData,
        selectedTab, setSelectedTab,
        stakeOptionBottomSheet,
        balanceModalVisible,
        setBalanceModalVisible,
        balanceValue, setBalanceValue,
        tempBalanceValue, setTempBalanceValue,
        handleOpenModal,
        handleCloseModal,
        handleSaveBalance,
        handleBalanceChange,
        getValue,
        graphData,
        graphLoading,
        getGraphData,
        dailyPnl
    }
}

export default useTokenDetails

