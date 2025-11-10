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
import QrScanner from '../../../components/QrScanner'

const SendTokenAddress = (props) => {
    const {
        tokenAddress, setTokenAddress,
        QrCodeScaner, setQrCodeScaner,
        errorMessage, setErrorMessage,
        handleQrcode,
        onNextPress
    } = useSendTokenAddress(props)

    return (
        <MainContainerApp>
            {QrCodeScaner ?
                <QrScanner
                    onSuccess={(adress) => { setQrCodeScaner(false), handleQrcode(adress) }}
                    onPress={() => setQrCodeScaner(false)}
                />
                :
                <>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.mainView}>
                             <NewCustomHeader title={'SOL'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                            <Spacer customHeight={hp(1)} />
                            <View style={{ ...appStyles.rowBasic, paddingHorizontal: wp(3) }}>
                                <PoppinsText style={styles.toText}>To:</PoppinsText>
                                <CustomTextInput5
                                    placeholder={'username or address'}
                                    value={tokenAddress}
                                    onChangeText={(text) => {
                                        setTokenAddress(text)
                                        setErrorMessage('')
                                    }}
                                    inputStyle={styles.inputStyle}
                                    containerStyle={styles.inputContainer}
                                    rightImage={Images.simpleScannerLogo}
                                    rightImageStyle={styles.rightImageStyle}
                                    onPressRightImage={() => setQrCodeScaner(true)}
                                />
                            </View>
                            <Spacer customHeight={hp(0.5)} />
                            <LineBreak style={styles.lineBreakStyle} />
                            {errorMessage &&
                                <PoppinsText style={styles.errorMessage}>{errorMessage}</PoppinsText>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(4) }}>
                        <CustomButton
                            title={'Next'}
                            disabled={tokenAddress?.length > 10 ? false : true}
                            onPressBtn={() => onNextPress()} />
                    </View>
                </>
            }
        </MainContainerApp>
    )
}

export default SendTokenAddress
