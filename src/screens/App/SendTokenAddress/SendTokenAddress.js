import { Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import useSendTokenAddress from './Hooks'
import { routes } from '../../../constants/routes'
import { appStyles } from '../../../utilities/appStyles'
import PoppinsText from '../../../components/PoppinsText'
import LineBreak from '../../../components/LineBreak'
import { CustomButton } from '../../../components/CustomButton'
import { NewCustomHeader } from '../../../components/MainHeader'

const SendTokenAddress = (props) => {
    const { tokenAddress, setTokenAddress } = useSendTokenAddress(props)
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    {/* <View style={styles.container}>
                        <View style={[appStyles.row,]}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                                <Image source={Images.backArrow} resizeMode='contain' style={styles.goBackArrow} />
                            </TouchableOpacity>
                            <PoppinsText style={styles.title}>{'Select Token'}</PoppinsText>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                                <PoppinsText style={styles.nextText}>{'Next'}</PoppinsText>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <NewCustomHeader title={'SOL'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />

                    <Spacer customHeight={hp(1)} />
                    <View style={{ ...appStyles.rowBasic, paddingHorizontal: wp(3) }}>
                        <PoppinsText style={styles.toText}>To:</PoppinsText>
                        <CustomTextInput5
                            placeholder={'username or address'}
                            inputStyle={styles.inputStyle} containerStyle={styles.inputContainer}
                            rightImage={Images.simpleScannerLogo} rightImageStyle={styles.rightImageStyle}
                            onPressRightImage={() => props?.navigation.navigate(routes.scanQrCode)}
                        />
                    </View>
                    <Spacer customHeight={hp(0.5)} />
                    <LineBreak style={styles.lineBreakStyle} />
                </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(4) }}>
                <CustomButton title={'Next'} onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default SendTokenAddress
