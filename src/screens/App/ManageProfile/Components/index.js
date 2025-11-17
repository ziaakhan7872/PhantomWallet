import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PoppinsText from '../../../../components/PoppinsText'
import Spacer from '../../../../components/Spacer'
import { colors } from '../../../../constants/colors'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import { Fonts } from '../../../../constants/fonts'

export const ManageProfileCard = ({ title, leftText, leftText1, rightText, onPressUserName, onPressBio }) => {
    return (
        <View>
            <PoppinsText style={styles.title}>{title}</PoppinsText>
            <Spacer />
            <TouchableOpacity activeOpacity={0.8} onPress={onPressUserName} style={styles.cardContainer}>
                <View style={appStyles.row}>
                    <PoppinsText style={styles.leftText}>{leftText}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.rightText}>{rightText}</PoppinsText>
                        <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                    </View>
                </View>
            </TouchableOpacity>
            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPressBio} style={[appStyles.row, styles.cardContainer1]}>
                <PoppinsText style={styles.leftText}>{leftText1}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const ManageProfileCard1 = ({ title, username, userNumber, authFactor, authNumber, Privacy, worldLogo, status, onPressFollowers, onPressPrivacy }) => {
    return (
        <View>
            <PoppinsText style={styles.title}>{title}</PoppinsText>
            <Spacer />
            <TouchableOpacity activeOpacity={0.8} onPress={onPressFollowers} style={styles.cardContainer}>
                <View style={appStyles.row}>
                    <PoppinsText style={styles.leftText}>{username}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.rightText}>{userNumber}</PoppinsText>
                        <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                    </View>
                </View>
            </TouchableOpacity>
            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} style={[appStyles.row, styles.cardContainer2]}>
                <PoppinsText style={styles.leftText}>{authFactor}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <PoppinsText style={styles.rightText}>{authNumber}</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                </View>
            </TouchableOpacity>
            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPressPrivacy} style={[appStyles.row, styles.cardContainer1]}>
                <PoppinsText style={styles.leftText}>{Privacy}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <Image source={worldLogo} resizeMode='contain' style={styles.worldLogo} />
                    <PoppinsText style={styles.rightText}>{status}</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    // ManageProfileCard
    cardContainer: {
        width: wp(92),
        alignSelf: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    cardContainer1: {
        width: wp(92),
        alignSelf: 'center',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    cardContainer2: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    // ManageProfileCard1
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray53,
        paddingHorizontal: wp(5)
    },
    leftText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray26
    },
    rightText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray50
    },
    arrowRight: {
        width: wp(3),
        height: wp(3),
        marginLeft: wp(3)
    },
    worldLogo: {
        width: wp(3),
        height: wp(3),
        marginRight: wp(2)
    }
})