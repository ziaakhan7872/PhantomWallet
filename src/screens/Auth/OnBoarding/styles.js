import { StyleSheet, } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { colors } from '../../../constants/colors'
import { Fonts } from '../../../constants/fonts'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    questionMark: {
        width: wp(4),
        height: hp(4),
        alignSelf: 'flex-end',
        marginRight: wp(4)
    },
    firstOnboardingLogo: {
        width: wp(100),
        height: hp(50),
        marginTop: hp(-10),
        alignSelf: 'center'
    },
    secondOnboardingLogo: {
        width: wp(100),
        height: hp(33.12),
        alignSelf: 'center'
    },
    thirdOnboardingLogo: {
        width: wp(100),
        height: hp(45),
        alignSelf: 'center'
    },
    fourthOnboardingLogo: {
        width: wp(100),
        height: hp(29),
        alignSelf: 'center'
    },
    fifthOnboardingLogo: {
        width: wp(100),
        height: hp(45),
        alignSelf: 'center'
    },
    sixthOnboardingLogo: {
        width: wp(100),
        height: hp(53),
        alignSelf: 'center'
    },
    welcomeText: {
        fontSize: 23,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray80,
        textAlign: 'center',
    },
    startedDesc: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray1,
        textAlign: 'center',
        width: wp(75)
    },
    slider1: {
        width: wp(14),
        height: hp(0.8),
        alignSelf: 'center'
    },
    btnView: {
        paddingHorizontal: wp(4),
        paddingBottom: hp(4)
    },
    btnSyles: {
        width: wp(92),
        height: hp(5.5),
        alignSelf: 'center',
        borderRadius: 12,
        justifyContent: 'center',
    },
    radioBtn: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(2)
    },
    termsText: {
        fontSize: 10,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray32,
        textAlign: 'center'
    },
    termsText1: {
        fontSize: 10,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.purple2,
        textAlign: 'center'
    },
    bottomText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray4
    },
    btnTitleStyles: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
    }
})