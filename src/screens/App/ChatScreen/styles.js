import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    comingSoonText: {
        fontSize: 20,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.white,
        textAlign: 'center'
    }
})