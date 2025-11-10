import { Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { appStyles } from '../../../utilities/appStyles'
import PoppinsText from '../../../components/PoppinsText'
import { Images } from '../../../Images'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { TokensList, TokenTabsSelection } from './Components'
import useYouPay from './Hooks'
import { routes } from '../../../constants/routes'

const YouPay = (props) => {
    const { type } = useYouPay(props)
    return (
        <MainContainerApp>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <Spacer customHeight={hp(6)} />
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.title}>{type === 'To' ? 'You Receive' : 'You Pay'}</PoppinsText>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                            <Image source={Images.cross} resizeMode='contain' style={styles.cross} />
                        </TouchableOpacity>
                    </View>
                    <Spacer />
                    <CustomTextInput5 leftImage={Images.searchWhite} containerStyle={styles.containerInputStyle} inputStyle={styles.inputStyle} placeholder='Enter amount' />
                    <Spacer />
                    <TokenTabsSelection />
                    <Spacer customHeight={hp(4)} />
                    <TokensList
                        onPressToken={(item) => {
                            console.log(item, 'itemitemitem');
                            props?.navigation.navigate(routes.swapMain, { item: item })
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </MainContainerApp>
    )
}

export default YouPay
