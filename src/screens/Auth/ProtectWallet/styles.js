import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    purpleLock: {
        width: wp(67.5),
        height: hp(30),
        alignSelf: 'center'
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray13,
        textAlign: 'center'
    },
    desc: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray9,
        textAlign: 'center',
        marginHorizontal: wp(14)
    },
})
