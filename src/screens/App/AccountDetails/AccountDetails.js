import { View } from 'react-native'
import React from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AccountsCard, AddAccountHeader, RowTabs } from './Components'
import Spacer from '../../../components/Spacer'
import PoppinsText from '../../../components/PoppinsText'
import { routes } from '../../../constants/routes'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomButton } from '../../../components/CustomButton'
import useAccountDetails from './Hooks'

const AccountDetails = (props) => {
    const {
        activeWalletWithTokens,
        allAccounts,
        onPressAccount
    } = useAccountDetails(props)

    return (
        <AppContainer>
            <View style={styles.mainView}>
                <Spacer />
                <AddAccountHeader logo={activeWalletWithTokens?.logo} activeWalletWithTokens={activeWalletWithTokens} onPressCross={() => props?.navigation.goBack()} />
                <Spacer />
                <RowTabs onPressProfile={() => props?.navigation.navigate(routes.editProfile, { item: activeWalletWithTokens })} onPressSettings={() => props?.navigation.navigate(routes.accountSettings, { item: activeWalletWithTokens })} />
                <Spacer />
                <PoppinsText style={styles.title}>Your Accounts</PoppinsText>
                <Spacer />
                <AccountsCard allAccounts={allAccounts} onPressAccount={(item) => onPressAccount(item)} onPressEdit={(item) => props?.navigation.navigate(routes.editAccount, { item, activeWalletWithTokens })} />
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Add Account'} onPressBtn={() => props?.navigation.navigate(routes.addAccounts)} />
            </View>
        </AppContainer>
    )
}

export default AccountDetails
