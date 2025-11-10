import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'

const GoLong = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(8)} />
                <Image source={Images.horzontallySlider2} style={styles.horizontallySlider2} />
                <Spacer customHeight={hp(3)} />
                <PoppinsText style={styles.goLongText}>Go Long</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.thinkPriceWillGoUpText}>You think the price will go up. If you're right, you can
                    earn. If it goes down, you lose</PoppinsText>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={Images.goLongImage} resizeMode='contain' style={styles.goLongImage} />
                </View>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Next'} onPressBtn={() => props.navigation.navigate(routes.goShort)} />
            </View>
        </MainContainerApp>
    )
}

export default GoLong
