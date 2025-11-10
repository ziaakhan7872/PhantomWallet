import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    backArrow: {
        width: wp(2.5),
        height: wp(3.5),
        marginRight: wp(3)
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray63
    },
    desc: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray117
    }
})