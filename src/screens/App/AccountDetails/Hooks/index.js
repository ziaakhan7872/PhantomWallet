import React, { useEffect, useState } from 'react'
import database from '../../../../services/database';

const useAccountDetails = (props) => {
    const activeWalletWithTokens = props?.route?.params?.activeWalletWithTokens

    const [allAccounts, setAllAccounts] = useState([]);

    useEffect(() => {
        getAllAccounts();
    }, []);

    const getAllAccounts = async () => {
        const accounts = await database.getAllWallets();
        console.log('accountsaccountsaccounts', accounts);
        setAllAccounts(accounts);
    }
    return {
        activeWalletWithTokens,
        allAccounts
    }
}

export default useAccountDetails
