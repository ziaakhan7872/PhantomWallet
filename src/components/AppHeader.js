import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyles } from '../utilities/appStyles'
import { hp, wp } from './ResponsiveComponent'
import { Fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import PoppinsText from './PoppinsText'

export const AppHeader = ({ leftImage, title, rightImage, onPressBack, onPressRightImage }) => {
    return (
        <View style={styles.container}>
            <View style={[appStyles.row,]}>
                <TouchableOpacity hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }} activeOpacity={0.8} onPress={onPressBack}>
                    <Image source={leftImage} resizeMode='contain' style={styles.leftImage} />
                </TouchableOpacity>
                <PoppinsText style={styles.title}>{title}</PoppinsText>
                <TouchableOpacity hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }} activeOpacity={0.8} onPress={onPressRightImage}>
                    <Image source={rightImage} resizeMode='contain' style={styles.rightImage} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        backgroundColor: colors.gray29,
        paddingHorizontal: wp(4),
        borderBottomWidth: 0.5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingVertical: hp(1.8)
    },
    leftImage: {
        width: wp(3),
        height: wp(3),
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray28,
    },
    rightImage: {
        width: wp(4),
        height: wp(4),
    }
})