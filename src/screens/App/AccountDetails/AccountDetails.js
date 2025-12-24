import { View, StatusBar } from 'react-native'
import React from 'react'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { AccountsCard, AddAccountHeader, RowTabs } from './Components'
import Spacer from '../../../components/Spacer'
import PoppinsText from '../../../components/PoppinsText'
import { routes } from '../../../constants/routes'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { CustomButton } from '../../../components/CustomButton'
import useAccountDetails from './Hooks'
import { colors } from '../../../constants/colors'
import { Fonts } from '../../../constants/fonts'

const AccountDetails = (props) => {
    const {
        activeWalletWithTokens,
        allAccounts,
        onPressAccount
    } = useAccountDetails(props)

    return (
        <View style={{ flex: 1, backgroundColor: colors.bgColor, }}>
            <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />


            <View style={styles.mainView}>
                <Spacer customHeight={hp(1.5)} />
                <AddAccountHeader logo={activeWalletWithTokens?.logo} activeWalletWithTokens={activeWalletWithTokens} onPressCross={() => props?.navigation.goBack()} />
                <Spacer />
                <RowTabs onPressProfile={() => props?.navigation.navigate(routes.editProfile, { item: activeWalletWithTokens })} onPressSettings={() => props?.navigation.navigate(routes.accountSettings, { item: activeWalletWithTokens })} />
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.title}>Your Accounts</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <AccountsCard allAccounts={allAccounts} onPressAccount={(item) => onPressAccount(item)} onPressEdit={(item) => props?.navigation.navigate(routes.editAccount, { item, activeWalletWithTokens })} />
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Add Account'} onPressBtn={() => props?.navigation.navigate(routes.addAccounts)}
                    btnSyles={{ backgroundColor: '#AD9EF8', borderRadius: 16 }}
                    titleStyles={{ color: '#0F0F0D', fontFamily: Fonts.Poppins.SemiBold }}
                />
            </View>
        </View>
    )
}

export default AccountDetails
