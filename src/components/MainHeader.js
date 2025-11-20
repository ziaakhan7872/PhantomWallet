import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { appStyles } from '../utilities/appStyles/index'
import { hp, wp } from './ResponsiveComponent'
import { Fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import { TouchableOpacity } from 'react-native'
import PoppinsText from './PoppinsText'

export const MainHeader = ({ onPressLeftImage, leftImage, title, centerImage }) => {
    return (
        <View style={{ ...appStyles.row, width: wp(92) }}>
            {leftImage ? (
                <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                    <Image source={leftImage} resizeMode='contain' style={styles.leftImage} />
                </TouchableOpacity>
            ) : <View style={styles.leftImage} />}
            {/* <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                <Image source={leftImage} resizeMode='contain' style={styles.leftImage} />
            </TouchableOpacity> */}
            <TouchableOpacity>
                <Image source={centerImage} resizeMode='contain' style={styles.centerImage} />
            </TouchableOpacity>
            <PoppinsText style={styles.title}>{title}</PoppinsText>
        </View>
    )
}

export const CustomHeader = ({ leftImage, rightImage, rightText, onPressLeftImage, onPressRightImage }) => {
    return (
        <View style={{ ...appStyles.row, width: wp(92), alignSelf: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                <Image source={leftImage} resizeMode='contain' style={styles.leftCustomImage} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressRightImage}>
                {rightImage ?
                    <Image source={rightImage} resizeMode='contain' style={styles.leftCustomImage} />
                    :
                    <PoppinsText style={styles.rightText}>{rightText}</PoppinsText>
                }
            </TouchableOpacity>
        </View>
    )
}

export const NewCustomHeader = ({ leftImage, title, rightImage, onPressLeftImage }) => {
    return (
        <View style={{ ...appStyles.row, width: wp(92), alignSelf: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                <Image source={leftImage} resizeMode='contain' style={styles.customLeftCustomImage} />
            </TouchableOpacity>
            <PoppinsText style={styles.customeHeaderTitle}>{title}</PoppinsText>
            {
                rightImage ?
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                        <Image source={rightImage} resizeMode='contain' style={styles.rightImage} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                        <Image style={styles.customLeftCustomImage} />
                    </TouchableOpacity>}
        </View>
    )
}

export const SimpleHeader = ({ leftImage, title, rightImage, onPressLeftImage }) => {
    return (
        <View style={[appStyles.rowBasic, { paddingHorizontal: wp(4) }]}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                <Image source={leftImage} tintColor={colors.gray83} resizeMode='contain' style={[styles.simpleIcon, { tintColor: colors.gray83 }]} />
            </TouchableOpacity>
            <PoppinsText style={styles.simpleTitle}>{title}</PoppinsText>
        </View>
    )
}

export const NewCustomHeader1 = ({ leftImage, title, rightImage, onPressLeftImage }) => {
    return (
        <View style={{ ...appStyles.row, width: wp(92), alignSelf: 'center' }}>
            <PoppinsText style={styles.customeHeaderTitle1}>{title}</PoppinsText>

            <View style={appStyles.rowBasic}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                    <Image source={rightImage} resizeMode='contain' style={[styles.img, { marginRight: wp(6) }]} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                    <Image source={leftImage} resizeMode='contain' style={[styles.img, { marginRight: wp(3) }]} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export const SeedPhraseCustomHeader = ({ leftImage, centerImage, rightImage, rightText, onPressLeftImage, onPressRightImage, onPressCenterImage }) => {
    return (
        <View style={{ ...appStyles.row, width: wp(92) }}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                <Image source={leftImage} resizeMode='contain' style={styles.leftArrowImage} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={onPressCenterImage}>
                <Image source={centerImage} resizeMode='contain' style={styles.centerImage1} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={onPressRightImage}>
                {rightImage ?
                    rightImage == 'none' ? <View style={styles.leftArrowImage} /> : <Image source={rightImage} resizeMode='contain' style={styles.leftCustomImage} />
                    :
                    <PoppinsText style={styles.rightText}>{rightText}</PoppinsText>
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    leftImage: {
        width: wp(3),
        height: wp(3)
    },
    centerImage: {
        width: wp(15),
        height: hp(3)
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white
    },
    // CustomHeader
    leftCustomImage: {
        width: wp(4),
        height: wp(4)
    },
    rightText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray12
    },
    // SeedPhraseHeader
    leftArrowImage: {
        width: wp(3),
        height: wp(3)
    },
    centerImage1: {
        width: wp(55),
        height: wp(3)
    },
    // NewCustomHeader
    customLeftCustomImage: {
        width: wp(3),
        height: wp(3)
    },
    customeHeaderTitle: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray83
    },
    customeHeaderTitle1: {
        fontSize: 24,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray83
    },
    simpleIcon: {
        width: wp(4.5),
        height: wp(4.5),
        marginRight: wp(3)
    },
    simpleTitle: {
        fontSize: 24,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray83
    },
    rightImage: {
        width: wp(4),
        height: wp(4)
    },
    img: {
        width: wp(5),
        height: wp(5)
    }
})