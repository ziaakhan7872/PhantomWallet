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

    const onPressAccount = async (item) => {
        const updateres = await database.switchActiveWallet(item?.id)
        if (updateres) {
            getAllAccounts();
        }
    }

    return {
        activeWalletWithTokens,
        allAccounts,
        onPressAccount
    }
}

export default useAccountDetails
