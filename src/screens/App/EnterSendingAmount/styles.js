import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { colors } from '../../../constants/colors'
import { Fonts } from '../../../constants/fonts'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    container: {
        width: wp(100),
        // backgroundColor: colors.gray29,
        paddingHorizontal: wp(4),
        // borderBottomWidth: 0.5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        // paddingVertical: hp(1.8)
    },
    goBackArrow: {
        width: wp(3),
        height: wp(3),
    },
    title: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray44,
    },
    nextText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray32,
    },
    toText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.gray10,
        marginTop: hp(0.4),
    },
    inputStyle: {
        width: wp(82),
        textAlign: 'left'
    },
    inputContainer: {
        width: wp(70),
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    rightImageStyle: {
        width: wp(4),
        height: wp(4)
    },
    lineBreakStyle: {
        width: wp(100),
        alignSelf: 'center',
        color: colors.gray69,
    },
    inputStyle1: {
        textAlign: 'left',
        fontSize: 42,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray77,
        textAlign: 'center',
        width: wp(30),
    },
    inputStyle2: {
        fontSize: 34,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray77,
        textAlign: 'center',
    },
    inputContainer1: {
        width: wp(30),
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    symbol: {
        fontSize: 34,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray77,
        marginLeft: wp(3)
    },
    switchWithRound: {
        width: wp(7),
        height: wp(7),
    },
    dollarAmount: {
        fontSize: 18,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray78,
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.red1,
        textAlign: 'center'
    }
})