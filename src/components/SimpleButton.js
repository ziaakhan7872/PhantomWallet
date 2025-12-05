import { StyleSheet, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { hp, wp } from './ResponsiveComponent';
import { colors } from '../constants/colors';
import PoppinsText from './PoppinsText';
import { Fonts } from '../constants/fonts';

const SimpleButton = ({ title, source, onPress, onPressIn, onPressOut, outerBox, btntitle, tintColor, Loading, loadingColor, disabled, titleColor }) => {
    return (
        <TouchableOpacity
            disabled={Loading ? Loading : disabled}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={0.8} onPress={onPress} style={[styles.CustomButton, outerBox]}>
            <View style={styles.rowView}>
                {source &&
                    <Image
                        source={source}
                        resizeMode='contain'
                        style={{ ...styles.icon1, tintColor: tintColor ? tintColor : colors.gray1 }}
                        tintColor={tintColor ? tintColor : colors.gray1}
                    />
                }
                {Loading ?
                    <ActivityIndicator
                        size="large"
                        color={loadingColor ? loadingColor : colors.white}
                    />
                    :
                    <PoppinsText style={[styles.titletext, { color: disabled ? '#505050' : titleColor ? titleColor : colors.gray28 }, btntitle,]}>{title}</PoppinsText>
                }
            </View>
        </TouchableOpacity>
    );
};

export default SimpleButton;

const styles = StyleSheet.create({
    CustomButton: {
        // borderWidth: 1,
        width: wp(92),
        borderColor: '#2F2F2F',
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(6)
    },
    titletext: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray52,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: wp(6),
        height: wp(6),
        marginRight: wp(3)
    },
    icon1: {
        width: wp(4),
        height: wp(4),
        marginRight: wp(3)
    },
});
