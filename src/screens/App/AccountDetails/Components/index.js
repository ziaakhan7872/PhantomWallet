import { FlatList, Image, StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native'
import React, { useRef } from 'react'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import PoppinsText from '../../../../components/PoppinsText'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import Spacer from '../../../../components/Spacer'
import { NumberRoundFunction } from '../../../../constants/commonHelperFunctions/commonHelperFunction'

export const AddAccountHeader = ({ logo, activeWalletWithTokens, onPressCross }) => {
    console.log('activeWalletWithTokens?.username', activeWalletWithTokens?.username);

    return (
        <View style={appStyles.row}>
            <View style={appStyles.rowBasic}>
                {/* <Image source={Images.profile1} resizeMode='contain' style={styles.profile1} /> */}
                <View style={{ padding: wp(2.5), borderRadius: 100, backgroundColor: '#222222', alignItems: 'center', justifyContent: 'center', marginRight: wp(2) }}>
                    <PoppinsText style={{ fontSize: 18, textAlign: 'center', }}>{logo ?? '😍'}</PoppinsText>
                </View>
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
    console.log('allAccountsallAccounts', allAccounts);

    const scaleValues = useRef({}).current;

    const getScaleValue = (id) => {
        if (!scaleValues[id]) {
            scaleValues[id] = new Animated.Value(1);
        }
        return scaleValues[id];
    };

    const handlePressIn = (id) => {
        Animated.timing(getScaleValue(id), {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };

    const handlePressOut = (id) => {
        Animated.timing(getScaleValue(id), {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };

    const handlePress = (id, item) => {
        Animated.timing(getScaleValue(id), {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();

        onPressAccount(item);

        handlePressOut(id);
    };

    return (
        <FlatList
            data={allAccounts}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            contentContainerStyle={{ paddingBottom: hp(5) }}
            renderItem={({ item, index }) => (
                <Animated.View style={{ transform: [{ scale: getScaleValue(index) }] }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => handlePressIn(index)}
                        onPressOut={() => handlePressOut(index)}
                        onPress={() => handlePress(index, item)}
                        style={[styles.accountsCardBgView, appStyles.row]}
                    >

                        {console.log('allAccounts', item)}
                        <View style={appStyles.rowBasic}>
                            <View style={{ marginRight: wp(3) }}>
                                {/* <Image source={Images.profile1} resizeMode='contain' style={styles.accountLogo} /> */}
                                {/* <PoppinsText style={{ fontSize: 36, marginRight: wp(2) }}>{item?.logo ?? '😍'}</PoppinsText> */}
                                <View style={{ width: wp(11.5), height: wp(11.5), borderRadius: 100, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
                                    <PoppinsText style={{ fontSize: 16, fontFamily: Fonts.Poppins.SemiBold, color: colors.white }}>{`A${index + 1}`}</PoppinsText>
                                </View>
                                {item?.isActive == 1 ? <Image source={Images.tickWithRound} resizeMode='contain' style={styles.tickWithRound} /> : null}
                            </View>

                            <View>
                                <PoppinsText style={styles.accountName}>{item?.name}</PoppinsText>
                                <PoppinsText style={styles.accountBalance}>${NumberRoundFunction(item?.totalBalance ?? 0)}</PoppinsText>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressEdit(item)}>
                            <Image source={Images.pencilWithRound} resizeMode='contain' style={styles.pencilWithRound} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Animated.View>
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
        fontSize: 20,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    address: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B1B1B1'
    },
    cross: {
        width: wp(4),
        height: wp(4)
    },
    // RowTabs
    tabBgView: {
        width: wp(45),
        padding: wp(4),
        borderRadius: 20,
        backgroundColor: colors.gray23
    },
    person: {
        width: wp(4.5),
        height: wp(5),
        alignSelf: 'center'
    },
    profileText: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B7B7B7',
        textAlign: 'center'
    },
    settings: {
        width: wp(6),
        height: wp(6),
        alignSelf: 'center'
    },
    settingsText: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B7B7B7',
        textAlign: 'center'
    },
    // AccountsCard
    accountsCardBgView: {
        // width: wp(45),
        borderWidth: 0.4,
        borderColor: '#1B1B1B',
        padding: wp(4),
        borderRadius: 20,
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
        right: 0,
        bottom: 0,
    },
    accountName: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    accountBalance: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4'
    },
    pencilWithRound: {
        width: wp(9),
        height: wp(9),
    }


})