import { Image, Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import LineBreak from '../../../components/LineBreak'
import { CustomKeyPad } from '../../../components/CustomKeyPad'
import useEnterSendingAmount from './Hooks'
import { AvailableAmountView } from './Components'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'

const EnterSendingAmount = (props) => {
    const { enteredAmount, setEnteredAmount, handleNumberPress, handleDelete, handleLanguage, } = useEnterSendingAmount()
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <View style={styles.container}>
                        <View style={[appStyles.row,]}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                                <Image source={Images.backArrow} resizeMode='contain' style={styles.goBackArrow} />
                            </TouchableOpacity>
                            <PoppinsText style={styles.title}>{'Enter Amount'}</PoppinsText>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                                <PoppinsText style={styles.nextText}>{'Next'}</PoppinsText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Spacer customHeight={hp(1)} />
                    <View style={{ ...appStyles.rowBasic, paddingHorizontal: wp(3) }}>
                        <PoppinsText style={styles.toText}>To:</PoppinsText>
                        <CustomTextInput5
                            placeholder={'username or address'}
                            inputStyle={styles.inputStyle} containerStyle={styles.inputContainer}
                            rightImage={Images.pencilWithBottomLine} rightImageStyle={styles.rightImageStyle}
                            onPressRightImage={() => { }}
                        />
                    </View>
                    <Spacer customHeight={hp(0.5)} />
                    <LineBreak style={styles.lineBreakStyle} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ ...appStyles.row, paddingHorizontal: wp(5) }}>
                            <View style={{ ...appStyles.rowBasic, overflow: 'hidden', paddingHorizontal: wp(5) }}>
                                <CustomTextInput5
                                    placeholder={'0'}
                                    value={enteredAmount || 0} onChangeText={(text) => setEnteredAmount(text)}
                                    inputStyle={styles.inputStyle1}
                                    containerStyle={styles.inputContainer1}
                                />
                                <PoppinsText style={styles.symbol}>{"SOL"}</PoppinsText>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={{}}>
                                <Image source={Images.switchWithRound} resizeMode='contain' style={styles.switchWithRound} />
                            </TouchableOpacity>
                        </View>
                        <PoppinsText style={styles.dollarAmount}>{"~$0.00"}</PoppinsText>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <View style={{}}>
                <Spacer customHeight={hp(1)} />
                <LineBreak style={styles.lineBreakStyle} />
                <Spacer customHeight={hp(1)} />
                <AvailableAmountView />
                <Spacer customHeight={hp(1)} />
                <CustomButton title={'Send'} onPressBtn={() => props?.navigation.navigate(routes.sendSummaryScreen)} />
                <Spacer customHeight={hp(1)} />
                <CustomKeyPad onPressNumber={handleNumberPress} onDelete={handleDelete} onLanguage={handleLanguage} />
            </View>
        </MainContainerApp>
    )
}

export default EnterSendingAmount
