import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    sliderThree: {
        width: wp(54.5),
        height: 3.78,
        alignSelf: 'center'
    },
    title: {
        fontSize: 23,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray99,
        textAlign: 'center'
    },
    desc: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray78,
        textAlign: 'center',
    },
    inputStyle: {
        width: wp(72),
        alignSelf: 'center',
        textAlign: 'left',
        paddingHorizontal: wp(3),
    },
    inputContainer: {
        backgroundColor: colors.gray68,
    },
    tickWithGreenHalfCircle: {
        width: wp(3),
        height: wp(3),
        marginRight: wp(2)
    },
    usernameAvailable: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.green17,
        textAlign: 'center'
    },
    usernameTaken: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.red || '#FF3B30',
        textAlign: 'center'
    },
    usernameChecking: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray78,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.red,
        textAlign: 'center',
        flex: 1
    }
})