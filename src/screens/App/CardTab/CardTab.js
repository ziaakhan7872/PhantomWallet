import { View, Text } from 'react-native'
import React from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import PoppinsText from '../../../components/PoppinsText'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'
import { Gifs } from '../../../Images/Gif'
import FastImage from 'react-native-fast-image'
import { hp, wp } from '../../../components/ResponsiveComponent'

const CardTab = () => {
    return (
        <MainContainerApp style={{}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <FastImage
                    source={Gifs.cardAnimation}
                    style={{ width: wp(100), height: hp(100) }}
                    resizeMode={FastImage.resizeMode.stretch}
                />

                {/* <PoppinsText style={{ fontSize: 20, fontFamily: Fonts.Poppins.Bold, color: colors.white }}>Coming Soon</PoppinsText> */}
            </View>
        </MainContainerApp>
    )
}

export default CardTab