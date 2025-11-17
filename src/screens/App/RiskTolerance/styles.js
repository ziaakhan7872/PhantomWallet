import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    horizontallySlider6: {
        width: wp(12),
        height: 4,
        alignSelf: 'center'
    },
    riskToleranceText: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray91,
        textAlign: 'center'
    },
    riskToleranceDesc: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray92,
        textAlign: 'center'
    }
})