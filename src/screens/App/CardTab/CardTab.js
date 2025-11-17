import { View, Text } from 'react-native'
import React from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import PoppinsText from '../../../components/PoppinsText'
import { Fonts } from '../../../constants/fonts'
import { colors } from '../../../constants/colors'

const CardTab = () => {
    return (
        <MainContainerApp style={{}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <PoppinsText style={{ fontSize: 20, fontFamily: Fonts.Poppins.Bold, color: colors.white }}>Coming Soon</PoppinsText>
            </View>
        </MainContainerApp>
    )
}

export default CardTab