import { Platform, StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { colors } from '../../../constants/colors'
import { Fonts } from '../../../constants/fonts'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    profile1: {
        width: wp(25),
        height: wp(25),
        alignSelf: 'center'
    },
    profileText: {
        fontSize: 52,
        // fontFamily: Fonts.Poppins.SemiBold,
        textAlign: 'center'
    },
    containerInputStyle: {
        width: wp(92),
        borderRadius: 7,
        paddingVertical: Platform.OS === 'ios' ? hp(1) : hp(0.1),
        backgroundColor: colors.gray94,
        alignSelf: 'flex-start'
    },
    inputStyle: {
        width: wp(70),
        textAlign: 'left',
        paddingHorizontal: wp(3)
    },
    suggestedText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray47,
        paddingHorizontal: wp(4)
    }
})