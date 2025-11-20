import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({

    mainView: {
        // flex: 1,
        paddingHorizontal: wp(4),
    },
    notificationLogo: {
        width: wp(6),
        height: wp(6),
        alignSelf: 'flex-end'
    },
    tokensText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white
    },
    threeVerticalDots: {
        width: wp(4),
        height: wp(4),
        marginRight: wp(3)
    },
    prepTitle: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray75
    },
    manageText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.lightPurple5
    },
    disclosures: {
        width: wp(4),
        height: wp(4),
        marginRight: wp(2)
    },
    lastText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: '#464646',
    }
})