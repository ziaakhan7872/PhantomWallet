import { useCallback, useEffect, useState } from "react";
import database from "../../../../services/database";
import { UpdateActiveWalletBalance } from "../../../../services/Helpers/FetchBalances";
import { calculateTotalBalance } from "../../../../services/Helpers/CommonHelper";
import { useFocusEffect } from "@react-navigation/native";

const useMoreTokens = (props) => {

    const [activeWalletWithTokens, setActiveWalletWithTokens] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [discoverTitle, setDiscoverTitle] = useState('Discover');
    const [dailyPnl, setDailyPnl] = useState({});
    const [isSkeltonLoading, setIsSkeltonLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getWallet();
        }, [])
    );

    const getWallet = async () => {
        const wallet = await database.getActiveWalletsWithTokenData();
        console.log('walletwalletwallet', wallet);
        setActiveWalletWithTokens(wallet);

        let balance = await calculateTotalBalance(wallet?.tokens)
        console.log('balancebalancebalancebalance', balance);

        setTotalBalance(balance?.totalBalance ?? 0)
        setDailyPnl(balance)
    }

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getWallet();
        setIsSkeltonLoading(true);
        setTimeout(() => {
            setIsSkeltonLoading(false);
        }, 2000);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return {
        activeWalletWithTokens,
        totalBalance,
        discoverTitle, setDiscoverTitle,
        refreshing,
        isSkeltonLoading,
        onRefresh,
        dailyPnl
    }
}

export default useMoreTokens
