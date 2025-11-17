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
        width: wp(4),
        height: wp(4),
        marginRight: wp(3)
    },
    userName: {
        fontSize: 17,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray49
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.gray54,
        backgroundColor: colors.gray55,
        borderRadius: 15,
    },
    errorText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.red,
        textAlign: 'center'
    }
})