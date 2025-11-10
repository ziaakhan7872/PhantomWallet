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
        backgroundColor: colors.gray29,
        paddingHorizontal: wp(4),
        borderBottomWidth: 0.5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingVertical: hp(1.8)
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
    errorMessage: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.red,
        marginTop: hp(0.5),
        textAlign: 'center',
    }
})