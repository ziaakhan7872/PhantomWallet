import { useEffect, useState } from "react";
import database from "../../../../services/database";

const useHomeScreen = (props) => {

    const [activeWalletWithTokens, setActiveWalletWithTokens] = useState([]);

    useEffect(() => {
        const getWallet = async () => {
            const wallet = await database.getActiveWalletsWithTokenData();
            console.log('walletwalletwallet', wallet);
            setActiveWalletWithTokens(wallet);
        }
        getWallet();
    }, []);

    return {
        activeWalletWithTokens
    }
}

export default useHomeScreen
