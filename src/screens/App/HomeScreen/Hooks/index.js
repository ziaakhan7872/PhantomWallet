import { useEffect, useState } from "react";
import database from "../../../../services/database";
import { UpdateActiveWalletBalance } from "../../../../services/Helpers/FetchBalances";

const useHomeScreen = (props) => {

    const [activeWalletWithTokens, setActiveWalletWithTokens] = useState([]);

    useEffect(() => {
        const getWallet = async () => {
            const wallet = await database.getActiveWalletsWithTokenData();
            console.log('walletwalletwallet', wallet);
            setActiveWalletWithTokens(wallet);
            await UpdateActiveWalletBalance(wallet);


            const wallet1 = await database.getActiveWalletsWithTokenData();
            console.log('walletwalletwallet', wallet1);
            setActiveWalletWithTokens(wallet1);
        }
        getWallet();
    }, []);

    return {
        activeWalletWithTokens
    }
}

export default useHomeScreen
