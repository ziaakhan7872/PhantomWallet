
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import PoppinsText from './PoppinsText'
import { hp, wp } from './ResponsiveComponent'

export const CustomButton = ({ title, leftImage, rightImage, leftImageStyle, rightImageStyle, tintColor, titleStyles, onPressBtn, btnSyles, loading, disabled }) => {
    return (
        <TouchableOpacity
            disabled={loading ? loading : disabled}
            activeOpacity={0.8} style={[{
                ...styles.btnContainer,
                backgroundColor: disabled ? colors.btnDisableColor : colors.btnColor
            }, btnSyles]} onPress={onPressBtn}>
            <View style={styles.contentContainer}>
                {leftImage &&
                    <Image
                        source={leftImage}
                        resizeMode='contain'
                        style={[{ ...styles.leftImage, tintColor: tintColor ? tintColor : colors.gray1 }, leftImageStyle]}
                        tintColor={tintColor ? tintColor : null}
                    />
                }
                {loading ?
                    <ActivityIndicator size="small" color={colors.white} />
                    :
                    <PoppinsText style={[styles.title, titleStyles]}>{title}</PoppinsText>
                }
                {rightImage &&
                    <Image
                        source={rightImage}
                        resizeMode='contain'
                        style={[{ ...styles.rightImage, tintColor: tintColor ? tintColor : colors.gray1 }, rightImageStyle]}
                        tintColor={tintColor ? tintColor : colors.gray1}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnContainer: {
        width: wp(90),
        height: hp(5.5),
        alignSelf: 'center',
        borderRadius: 12,
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray2,
        textAlign: 'center',
        marginLeft: wp(2)
    },
    leftImage: {
        width: wp(3),
        height: wp(3),
    },
    rightImage: {
        width: wp(4.5),
        height: wp(4.5),
        marginLeft: wp(3),
        marginTop: hp(0.2)
    }
})