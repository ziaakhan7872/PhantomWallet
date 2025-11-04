import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    recoveryPhraseText: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.white,
        textAlign: 'center'
    },
    recoveryPhraseDsec: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray9,
        textAlign: 'center'
    },
    btnSyles: {
        width: wp(92),
        height: hp(5.5),
        alignSelf: 'center',
        borderRadius: 12,
        justifyContent: 'center',
    },
    errorMessage: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.red,
        textAlign: 'center',
        marginTop: hp(1)
    }
})