import { StyleSheet } from 'react-native'
import { wp } from '../../../components/ResponsiveComponent'

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    profile1: {
        width: wp(25),
        height: wp(25),
        alignSelf: 'center',
        borderRadius: 100
    },
    pencilWithBlackRound: {
        width: wp(6.5),
        height: wp(6.5),
        position: 'absolute',
        bottom: 10,
        right: 5
    }
})