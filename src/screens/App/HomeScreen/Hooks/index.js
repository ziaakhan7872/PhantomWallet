import { useEffect, useState } from "react";
import database from "../../../../services/database";
import { UpdateActiveWalletBalance } from "../../../../services/Helpers/FetchBalances";
import { calculateTotalBalance } from "../../../../services/Helpers/CommonHelper";

const useHomeScreen = (props) => {

    const [activeWalletWithTokens, setActiveWalletWithTokens] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        const getWallet = async () => {
            const wallet = await database.getActiveWalletsWithTokenData();
            console.log('walletwalletwallet', wallet);
            setActiveWalletWithTokens(wallet);
            await UpdateActiveWalletBalance(wallet);

            let balance = await calculateTotalBalance(wallet?.tokens)
            setTotalBalance(balance ?? 0)

            const wallet1 = await database.getActiveWalletsWithTokenData();
            console.log('walletwalletwallet', wallet1);
            setActiveWalletWithTokens(wallet1);
        }
        getWallet();
    }, []);

    return {
        activeWalletWithTokens,
        totalBalance
    }
}

export default useHomeScreen
