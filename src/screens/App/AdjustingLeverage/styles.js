import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    horizontallySlider2: {
        width: wp(12),
        height: 4,
        alignSelf: 'center'
    },
    adjustingLeverageText: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray90,
        textAlign: 'center'
    },
    leverageText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray72,
        textAlign: 'center'
    },
    levereageLogo: {
        width: wp(100),
        height: hp(18.37),
        alignSelf: 'center'
    },
    leverageValue: {
        fontSize: 46,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray74,
        textAlign: 'center'
    }
})