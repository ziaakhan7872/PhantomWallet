import React from "react"
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import { colors } from "../constants/colors"
import { appStyles } from "../utilities/appStyles"
import PoppinsText from "./PoppinsText"
import { hp, wp } from "./ResponsiveComponent"

export const MainContainer = ({ style, children }) => {
    return (
        <View style={[{
            ...styles.mainContainer,
        }, style]}>
            <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
            {children}
        </View>
    )
}

export const MainContainerApp = ({ style, children }) => {
    return (
        <View style={[{
            ...styles.mainContainer1,
        }, style]}>
            <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
            {children}
        </View>
    )
}

export const AppContainer = ({ style, children, }) => {
    return (
        <View style={[{
            ...styles.mainContainer2,
        }, style]}>

            <StatusBar backgroundColor={'black'} translucent barStyle={'light-content'} />

            <View style={[styles.container]} />

            <View style={{ flex: 1, backgroundColor: colors.bgColor, borderRadius: 12 }}>
                {children}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgColor
    },
    mainContainer1: {
        flex: 1,
        backgroundColor: colors.bgColor
    },
    mainContainer2: {
        flex: 1,
        backgroundColor: colors.bgColor,
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
    },
    container: {
        width: wp(92),
        marginTop: hp(7),
        // marginBottom: hp(0.3),
        paddingVertical: hp(0.5),
        alignSelf: 'center',
        backgroundColor: colors.gray30,
        borderBottomWidth: 0.5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
})