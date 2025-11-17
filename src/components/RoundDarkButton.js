
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { Images } from '../Images'
import { Fonts } from '../constants/fonts'
import { hp, wp } from './ResponsiveComponent'
import { colors } from '../constants/colors'
import PoppinsText from './PoppinsText'
import { appStyles } from '../utilities/appStyles'

export const RoundDarkButton = ({ title, copyLogo, onPressBtn, btnContainerStyles }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{}} onPress={onPressBtn}>
            <ImageBackground source={Images.roundDarkButton} resizeMode='contain' style={[styles.roundLightButton, btnContainerStyles]}>
                <View style={{ ...appStyles.rowBasic, alignSelf: 'center' }}>
                    <PoppinsText style={styles.title}>{title}</PoppinsText>
                    {copyLogo ?
                        <Image source={copyLogo} resizeMode='contain' style={styles.copyLogo} />
                        : null}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundLightButton: {
        width: wp(92),
        height: hp(7),
        alignSelf: 'center',
        borderRadius: 100,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        textAlign: 'center',
    },
    copyLogo: {
        width: wp(6),
        height: wp(6),
        marginLeft: wp(2)
    }
})