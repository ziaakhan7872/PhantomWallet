import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import PoppinsText from '../../../../components/PoppinsText'
import { wp } from '../../../../components/ResponsiveComponent'
import { colors } from '../../../../constants/colors'
import { Fonts } from '../../../../constants/fonts'

export const FaceIDCard = ({ isFaceIdEnabled, setIsFaceIdEnabled, onSetToggle }) => {
    return (
        <View style={[appStyles.row, styles.faceIDCard]}>
            <View style={appStyles.rowBasic}>
                <Image source={Images.face} resizeMode='contain' style={styles.face} />
                <View>
                    <PoppinsText style={styles.faceText}>{Platform.OS === 'ios' ? 'Face ID' : 'Biometric'}</PoppinsText>
                    <PoppinsText style={styles.faceDesct}>Use {Platform.OS === 'ios' ? 'Face ID' : 'Biometric'} Authentication</PoppinsText>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={onSetToggle}>
                <Image source={isFaceIdEnabled ? Images.toggleOn : Images.toggleOff} resizeMode='contain' style={styles.toggle} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    faceIDCard: {
        width: wp(92),
        alignSelf: 'center',
        padding: wp(3),
        backgroundColor: colors.gray14,
        borderRadius: 12
    },
    face: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(3)
    },
    faceText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray15
    },
    faceDesct: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray16
    },
    toggle: {
        width: wp(11.5),
        height: wp(6.5)
    }
})