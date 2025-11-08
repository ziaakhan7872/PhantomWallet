import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { appStyles } from '../../../utilities/appStyles'
import PoppinsText from '../../../components/PoppinsText'
import { Images } from '../../../Images'
import { SettingsList } from './Components'
import { routes } from '../../../constants/routes'

const TokenDetailSettings = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <View style={appStyles.row}>
                    <PoppinsText style={styles.title}>Settings</PoppinsText>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                        <Image source={Images.cross} resizeMode='contain' style={styles.cross} />
                    </TouchableOpacity>
                </View>
                <Spacer customHeight={hp(3)} />
                <SettingsList onPressSlippage={() => props?.navigation.navigate(routes.slippage)} onPressPriorityFee={() => props?.navigation.navigate(routes.priorityFee)} onPressTip={() => props?.navigation.navigate(routes.tipScreen)} />
            </View>
        </MainContainerApp>
    )
}

export default TokenDetailSettings
