import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'
export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    tokenLogo: {
        width: wp(17.5),
        height: wp(17.5),
        alignSelf: 'center',
        borderRadius: 100
    },
    amount: {
        fontSize: 34,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.green2,
        textAlign: 'center',
    }
})