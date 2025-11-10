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
            <TouchableOpacity activeOpacity={0.8} onPress={onPressLeftImage}>
                <Image source={leftImage} resizeMode='contain' style={styles.leftImage} />
            </TouchableOpacity>
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
                    <Image source={rightImage} resizeMode='contain' style={styles.leftCustomImage} />
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
        fontWeight: Fonts.Poppins.Regular,
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
    rightImage: {
        width: wp(4),
        height: wp(4)
    }
})