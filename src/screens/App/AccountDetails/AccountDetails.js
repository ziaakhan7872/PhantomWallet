import { View, TouchableWithoutFeedback, Platform } from 'react-native'
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
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            {/* Top transparent area - tapping here closes the modal */}
            <TouchableWithoutFeedback onPress={() => props?.navigation.goBack()}>
                <View style={{ height: Platform.OS === 'ios' ? hp(7) : hp(2) }} />
            </TouchableWithoutFeedback>
            
            {/* Modal content with rounded top corners */}
            <View style={{ 
                flex: 1, 
                backgroundColor: colors.bgColor,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                overflow: 'hidden',
            }}>
                {/* Drag indicator */}
                {/* <View style={{ alignItems: 'center', paddingTop: hp(1.5) }}>
                    <View style={{ 
                        width: wp(10), 
                        height: 4, 
                        backgroundColor: '#3A3A3C', 
                        borderRadius: 2 
                    }} />
                </View> */}
                
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
        </View>
    )
}

export default AccountDetails
