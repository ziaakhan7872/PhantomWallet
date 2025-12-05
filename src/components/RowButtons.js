import { Animated, StyleSheet, View } from "react-native";
import { hp, wp } from "./ResponsiveComponent";
import SimpleButton from "./SimpleButton";
import { colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

export const RowButtons = ({
    onPressBtn1,
    onPressBtn2,
    style,
    wrapperStyle,
    styleBtn,
    btnImage2,
    btnImage1,
    tintColor1,
    tintColor2,
    btntitle,
    btntitle1,
    Loading,
    disable,
    disablebtn2,
    secondLoading,
    titlebtn1,
    titlebtn2,
    titleColor1,
    titleColor2,
    onPressInBtn1,
    onPressOutBtn1,
    onPressInBtn2,
    onPressOutBtn2,
    scale1, scale2
}) => {
    return (
        <View style={[styles.btnRow, wrapperStyle]}>
            <Animated.View style={{ transform: [{ scale: scale1 }] }}>
                <SimpleButton
                    source={btnImage1}
                    Loading={secondLoading}
                    onPressIn={onPressInBtn1}
                    onPressOut={onPressOutBtn1}
                    tintColor={tintColor1}
                    title={titlebtn1 ? titlebtn1 : 'Cancel'}
                    onPress={onPressBtn1}
                    // btntitle={btntitle}
                    titleColor={titleColor1}
                    disabled={disablebtn2}
                    outerBox={[{ width: wp(45), backgroundColor: colors.white, borderColor: colors.appButtonColor1, borderWidth: 1, borderRadius: 80 }, style]}
                />
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: scale2 }] }}>
                <SimpleButton
                    source={btnImage2}
                    tintColor={tintColor2}
                    onPressIn={onPressInBtn2}
                    onPressOut={onPressOutBtn2}
                    title={titlebtn2 ? titlebtn2 : 'Activate'}
                    onPress={onPressBtn2}
                    // btntitle={btntitle1}
                    Loading={Loading}
                    titleColor={titleColor2}
                    disabled={disable}
                    outerBox={[{ width: wp(45), backgroundColor: colors.appButtonColor1, borderColor: colors.appButtonColor1, borderWidth: 1, borderRadius: 80 }, styleBtn]}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp(90),
        paddingHorizontal: wp(2)
    },
    btn1Title:
    {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        textAlign: 'center',
    },
    simpleRoundBox: {
        width: wp(42),
        height: hp(7),
    }
})