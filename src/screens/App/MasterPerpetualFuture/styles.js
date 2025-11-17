import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    horizontallySlider1: {
        width: wp(12),
        height: 4,
        alignSelf: 'center'
    },
    masterPerpetualFutureText: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray90,
        textAlign: 'center'
    },
    perpetualFutureText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray72,
        textAlign: 'center'
    },
    perpImage1: {
        width: wp(68),
        height: hp(17.5),
        alignSelf: 'center'
    }
})