import { useCallback, useEffect, useState } from "react";
import database from "../../../../services/database";
import { UpdateActiveWalletBalance } from "../../../../services/Helpers/FetchBalances";
import { calculateTotalBalance } from "../../../../services/Helpers/CommonHelper";
import { useFocusEffect } from "@react-navigation/native";

const useHomeScreen = (props) => {

    const [activeWalletWithTokens, setActiveWalletWithTokens] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [discoverTitle, setDiscoverTitle] = useState('Discover');
    const [dailyPnl, setDailyPnl] = useState({});

    useFocusEffect(
        useCallback(() => {
            getWallet();
        }, [])
    );

    const getWallet = async () => {
        const wallet = await database.getActiveWalletsWithTokenData();
        console.log('walletwalletwallet', wallet);
        setActiveWalletWithTokens(wallet);

        // const wallet = await database.getActiveWalletsWithTokenData();
        // console.log('walletwalletwallet:::::', wallet);
        let balance = await calculateTotalBalance(wallet?.tokens)
        console.log('balancebalancebalancebalance', balance);

        setTotalBalance(balance?.totalBalance ?? 0)
        setDailyPnl(balance)

        await UpdateActiveWalletBalance(wallet);

        // const wallet1 = await database.getActiveWalletsWithTokenData();
        // console.log('walletwalletwallet', wallet1);
        // setActiveWalletWithTokens(wallet1);
    }

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getWallet();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return {
        activeWalletWithTokens,
        totalBalance,
        discoverTitle, setDiscoverTitle,
        refreshing,
        onRefresh,
        dailyPnl
    }
}

export default useHomeScreen
