import { StyleSheet, } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // paddingHorizontal: wp(4)
    },
    tokenLogo: {
        width: wp(10),
        height: wp(10),
        margin: wp(2)
    },
    tokenSymbol: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white
    },
    tokenName: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray8
    },
    resText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray8,
        textAlign: 'center'
    },
    qrview: {
        alignSelf: 'center',
        backgroundColor: colors.gray39,
        borderRadius: 10
    },
    scannerView: {
        width: wp(62.5),
        height: wp(62.5),
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    customeBtn1: {
        width: wp(92),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray51,
        borderRadius: 12,
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
    },
    titleStyles: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray44,
    }
})