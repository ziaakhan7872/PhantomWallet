import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    backArrow: {
        width: wp(3),
        height: wp(3),
        marginRight: wp(3)
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray49
    },
    rightPurpleArrow: {
        width: wp(6),
        height: wp(6),
        alignSelf: 'center'
    },
    amount: {
        fontSize: 50,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray80,
        textAlign: 'center'
    },
    dollarAmount: {
        fontSize: 18,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray81,
        textAlign: 'center'
    },
    alertViewBgView: {
        padding: wp(4),
        borderRadius: 13,
        backgroundColor: colors.alertBgColor,
        alignItems: 'center'
    },
    alertInfoTriangle: {
        width: wp(4),
        height: wp(4),
        marginRight: wp(3),
        alignSelf: 'flex-start'
    },
    alertText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray82,
        width: wp(78)
    },
    errorMessage: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.red,
        textAlign: 'center',
        marginTop: hp(1)
    }
})