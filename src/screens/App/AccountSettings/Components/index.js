import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { colors } from '../../../../constants/colors'
import { appStyles } from '../../../../utilities/appStyles'
import { Fonts } from '../../../../constants/fonts'
import PoppinsText from '../../../../components/PoppinsText'
import { Images } from '../../../../Images'
import Spacer from '../../../../components/Spacer'

export const AccountCard = ({ logo, profile, name, onPress, rightImage }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, appStyles.row]}>
            <View style={appStyles.rowBasic}>
                {/* <Image source={profile} resizeMode='contain' style={styles.profile} /> */}
                <PoppinsText style={{ fontSize: 36, marginRight: wp(2) }}>{logo ?? '😍'}</PoppinsText>
                <PoppinsText style={styles.name}>{name}</PoppinsText>
            </View>
            <Image source={rightImage} resizeMode='contain' style={styles.rightImage} />
        </TouchableOpacity>
    )
}

export const AccountSettingCard = ({ leftImage1, title1, leftImage2, title2, leftImage3, title3, onPress1, onPress2, onPress3, numbers, title1Style, rightImage1, rightImage2, rightImage3 }) => {
    return (
        <View>
            <View style={styles.cardContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={onPress1} style={appStyles.row}>
                    <View style={appStyles.rowBasic}>
                        <Image source={leftImage1} resizeMode='contain' style={styles.lefImage} />
                        <PoppinsText style={[styles.leftText, title1Style]}>{title1}</PoppinsText>
                    </View>
                    <View style={appStyles.rowBasic}>
                        {numbers ?
                            <PoppinsText style={styles.numbers}>{numbers}</PoppinsText>
                            : null}
                        <Image source={rightImage1 ? rightImage1 : Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                    </View>
                </TouchableOpacity>
            </View>

            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPress2} style={[appStyles.row, styles.cardContainer2]}>
                <View style={appStyles.rowBasic}>
                    <Image source={leftImage2} resizeMode='contain' style={styles.lefImage} />
                    <PoppinsText style={styles.leftText}>{title2}</PoppinsText>
                </View>
                <Image source={rightImage2 ? rightImage2 : Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
            </TouchableOpacity>

            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPress3} style={[appStyles.row, styles.cardContainer1]}>
                <View style={appStyles.rowBasic}>
                    <Image source={leftImage3} resizeMode='contain' style={styles.lefImage} />
                    <PoppinsText style={styles.leftText}>{title3}</PoppinsText>
                </View>
                <Image source={rightImage3 ? rightImage3 : Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: wp(4),
        borderRadius: 13,
        backgroundColor: colors.gray14,
    },
    profile: {
        width: wp(10.5),
        height: wp(10.5),
        marginRight: wp(3)
    },
    name: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray26
    },
    rightImage: {
        width: wp(2),
        height: wp(2.5)
    },
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
    leftText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray26
    },
    numbers: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray24,
        marginRight: wp(3)
    },
    lefImage: {
        width: wp(3),
        height: wp(3),
        marginRight: wp(3)
    },
    arrowRight: {
        width: wp(3),
        height: wp(3)
    }
})