

import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyles } from '../../../../utilities/appStyles'
import PoppinsText from '../../../../components/PoppinsText'
import { Images } from '../../../../Images'
import { colors } from '../../../../constants/colors'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Fonts } from '../../../../constants/fonts'
import Spacer from '../../../../components/Spacer'
import { EvmChainsArray, MultiChainChainsArray } from '../../../../components/dummyData'
import { formatAddress } from '../../../../services/Helpers/CommonHelper'

export const SelectedAccountCard = ({ checkedAccounts, setCheckedAccounts }) => {
    return (
        <View style={[appStyles.row, styles.container]}>
            <PoppinsText style={styles.accountsText}>1 accounts selected</PoppinsText>
            <TouchableOpacity activeOpacity={0.8} style={{ ...appStyles.rowBasic, alignSelf: 'center' }} onPress={() => setCheckedAccounts(!checkedAccounts)}>
                <PoppinsText style={styles.selectAllText}>Select All</PoppinsText>
                <Image source={checkedAccounts ? Images.checkBox : Images.unCheckBox} resizeMode='contain' style={styles.checkBox} />
            </TouchableOpacity>
        </View>
    )
}

export const FindAccountsCard = ({ allwallets, isSeedPhrase, accountSelection, setAccountSelection }) => {

    return (
        <>
            <TouchableOpacity activeOpacity={0.8} style={[appStyles.row, styles.container1]} onPress={() => setAccountSelection(!accountSelection)}>
                <PoppinsText style={styles.accountsText}>Account 1</PoppinsText>
                <Image source={accountSelection ? Images.checkBox : Images.unCheckBox} resizeMode='contain' style={styles.checkBox} />
            </TouchableOpacity>
            {/* <Spacer customHeight={hp(0.2)} /> */}

            <FlatList
                data={isSeedPhrase ? MultiChainChainsArray?.filter(item => item?.type == 'chain') : EvmChainsArray?.filter(item => item?.type == 'chain')}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity activeOpacity={0.8} style={[appStyles.row, styles.container2]} >
                                <View style={appStyles.rowBasic}>
                                    <Image source={{ uri: item?.tokenImage }} resizeMode='contain' style={styles.tokenLogo} />
                                    <View>
                                        <PoppinsText style={styles.tokenName}>{item?.tokenName}</PoppinsText>
                                        <Spacer customHeight={hp(0.2)} />
                                        <PoppinsText style={styles.tokenAmount}>{item?.symbol}</PoppinsText>
                                    </View>
                                </View>
                                <PoppinsText style={styles.accountsAddress}>{formatAddress(item?.isEvm == 1 ? allwallets?.evmWallet?.address : item?.chainName == 'bitcoin' ? allwallets?.bitcoin?.address : allwallets?.solana?.address)}</PoppinsText>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: wp(4),
        backgroundColor: colors.gray23,
        borderRadius: 12
    },
    accountsText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray25
    },
    checkBox: {
        width: wp(4.5),
        height: wp(4.5),
        marginLeft: wp(3),
        marginBottom: hp(0.4)
    },
    selectAllText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray24
    },
    // FindAccountsCard
    container1: {
        padding: wp(4),
        backgroundColor: colors.gray23,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    container2: {
        padding: wp(4),
        backgroundColor: colors.gray23,
        // borderBottomLeftRadius: 12,
        // borderBottomRightRadius: 12
    },
    tokenLogo: {
        width: wp(9),
        height: wp(9),
        marginRight: wp(3),
        borderRadius: 100
    },
    tokenName: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray26
    },
    tokenAmount: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray24
    },
    accountsAddress: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray27,
    }
})