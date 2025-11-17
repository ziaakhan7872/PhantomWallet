import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import PoppinsText from '../../../../components/PoppinsText'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import Spacer from '../../../../components/Spacer'

export const AddAccountHeader = ({ logo, activeWalletWithTokens, onPressCross }) => {
    return (
        <View style={appStyles.row}>
            <View style={appStyles.rowBasic}>
                {/* <Image source={Images.profile1} resizeMode='contain' style={styles.profile1} /> */}
                <PoppinsText style={{ fontSize: 36, marginRight: wp(2) }}>{logo ?? '😍'}</PoppinsText>
                <View>
                    {activeWalletWithTokens?.username ? <PoppinsText style={styles.userName}>{`@${activeWalletWithTokens?.username}`}</PoppinsText> : null}
                    <PoppinsText style={styles.address}>O followers</PoppinsText>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressCross}>
                <Image source={Images.cross} resizeMode='contain' style={styles.cross} />
            </TouchableOpacity>
        </View>
    )
}

export const RowTabs = ({ onPressProfile, onPressSettings }) => {
    return (
        <View style={appStyles.row}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressProfile} style={styles.tabBgView}>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={Images.onePerson} resizeMode='contain' style={styles.person} />
                    <Spacer customHeight={hp(1)} />
                    <PoppinsText style={styles.profileText}>Profile</PoppinsText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressSettings} style={styles.tabBgView}>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={Images.settngs} resizeMode='contain' style={styles.settings} />
                    <Spacer customHeight={hp(1)} />
                    <PoppinsText style={styles.settingsText}>Settings</PoppinsText>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const AccountsCard = ({ allAccounts, onPressEdit, onPressAccount }) => {

    return (
        <FlatList
            data={allAccounts}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.8} onPress={() => onPressAccount(item)} style={[styles.accountsCardBgView, appStyles.row]}>
                    <View style={appStyles.rowBasic}>
                        <View style={{ marginRight: wp(3) }}>
                            {/* <Image source={Images.profile1} resizeMode='contain' style={styles.accountLogo} /> */}
                            <PoppinsText style={{ fontSize: 36, marginRight: wp(2) }}>{item?.logo ?? '😍'}</PoppinsText>
                            {item?.isActive == 1 ? <Image source={Images.tickWithRound} resizeMode='contain' style={styles.tickWithRound} /> : null}
                        </View>
                        <PoppinsText style={styles.accountName}>{item?.name}</PoppinsText>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressEdit(item)}>
                        <Image source={Images.pencilWithRound} resizeMode='contain' style={styles.pencilWithRound} />
                    </TouchableOpacity>
                </TouchableOpacity>
                // <View style={[styles.accountsCardBgView, appStyles.row]}>
                //     <View style={appStyles.rowBasic}>
                //         <View style={{ marginRight: wp(3) }}>
                //             <Image source={Images.accountLogo} resizeMode='contain' style={styles.accountLogo} />
                //             <Image source={Images.tickWithRound} resizeMode='contain' style={styles.tickWithRound} />
                //         </View>
                //         <PoppinsText style={styles.accountName}>Account 1</PoppinsText>
                //     </View>
                //     <TouchableOpacity activeOpacity={0.8} onPress={onPressEdit}>
                //         <Image source={Images.pencilWithRound} resizeMode='contain' style={styles.pencilWithRound} />
                //     </TouchableOpacity>
                // </View>
            )} />
    )
}

const styles = StyleSheet.create({
    profile1: {
        width: wp(9),
        height: wp(9),
        marginRight: wp(3)
    },
    userName: {
        fontSize: 17,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray44
    },
    address: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray45
    },
    cross: {
        width: wp(4),
        height: wp(4)
    },
    // RowTabs
    tabBgView: {
        width: wp(45),
        borderWidth: 1,
        borderColor: colors.gray46,
        padding: wp(4),
        borderRadius: 13,
        backgroundColor: colors.gray23
    },
    person: {
        width: wp(4.5),
        height: wp(5),
        alignSelf: 'center'
    },
    profileText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray47,
        textAlign: 'center'
    },
    settings: {
        width: wp(6),
        height: wp(6),
        alignSelf: 'center'
    },
    settingsText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray47,
        textAlign: 'center'
    },
    // AccountsCard
    accountsCardBgView: {
        // width: wp(45),
        borderWidth: 1,
        borderColor: colors.gray46,
        padding: wp(4),
        borderRadius: 13,
        backgroundColor: colors.gray23
    },
    accountLogo: {
        width: wp(10.5),
        height: wp(10.5),
    },
    tickWithRound: {
        width: wp(4.5),
        height: wp(4.5),
        position: 'absolute',
        right: 2,
        bottom: 3,
    },
    accountName: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray27
    },
    pencilWithRound: {
        width: wp(9),
        height: wp(9),
    }


})