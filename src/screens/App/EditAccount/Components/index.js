import { Image, View, TouchableOpacity, StyleSheet } from "react-native"
import PoppinsText from "../../../../components/PoppinsText"
import { Images } from "../../../../Images"
import Spacer from "../../../../components/Spacer"
import { appStyles } from "../../../../utilities/appStyles"
import { hp, wp } from "../../../../components/ResponsiveComponent"
import { colors } from "../../../../constants/colors"
import { Fonts } from "../../../../constants/fonts"


export const EditAccountCard = ({ leftText, leftText1, rightText, onPressTitle, onPressDesc, username, onPressUsername }) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressTitle} style={styles.cardContainer}>
                <View style={appStyles.row}>
                    <PoppinsText style={styles.leftText}>{leftText}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.rightText}>{rightText}</PoppinsText>
                        <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                    </View>
                </View>
            </TouchableOpacity>
            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPressUsername} style={[appStyles.row, styles.cardContainer3]}>
                <PoppinsText style={styles.leftText}>{'User Name'}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <PoppinsText style={styles.rightText}>{username}</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                </View>
            </TouchableOpacity>
            <Spacer customHeight={hp(0.2)} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPressDesc} style={[appStyles.row, styles.cardContainer1]}>
                <PoppinsText style={styles.leftText}>{leftText1}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    // ManageProfileCard
    cardContainer: {
        width: wp(92),
        alignSelf: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(5)
    },
    cardContainer1: {
        width: wp(92),
        alignSelf: 'center',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(5)
    },
    cardContainer3: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: colors.gray23,
        padding: wp(5)
    },
    cardContainer2: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    // ManageProfileCard1
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray53
    },
    leftText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray26
    },
    rightText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray50
    },
    arrowRight: {
        width: wp(3),
        height: wp(3),
        marginLeft: wp(3)
    },
    worldLogo: {
        width: wp(3),
        height: wp(3),
        marginRight: wp(2)
    }
})