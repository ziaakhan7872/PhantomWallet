import { useEffect, useState } from "react";
import database from "../../../../services/database";

const useHomeScreen = () => {

    const [selectedTab, setSelectedTab] = useState('tokens');

    useEffect(() => {
        const getWallet = async () => {
            const wallet = await database.getActiveWallet();
            console.log('walletwalletwallet', wallet);
        }
        getWallet();
    }, []);

    return {
        selectedTab, setSelectedTab
    }
}

export default useHomeScreen
