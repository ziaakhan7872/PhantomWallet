import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { Images } from '../../../Images'
import useEnterStakeSolAmount from './Hooks'
import { CustomKeyPad } from '../../../components/CustomKeyPad'
import { AvailableAmountView } from './Components'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import LineBreak from '../../../components/LineBreak'
import { appStyles } from '../../../utilities/appStyles'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import PoppinsText from '../../../components/PoppinsText'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'
import { NewCustomHeader } from '../../../components/MainHeader'

const EnterStakeSolAmount = (props) => {
    const { enteredAmount, handleNumberPress, handleDelete, handleLanguage } = useEnterStakeSolAmount(props)
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <NewCustomHeader title={'Stake SOL'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ ...appStyles.rowBasic, overflow: 'hidden', alignSelf: 'center' }}>
                            <CustomTextInput5
                                placeholder={'0'}
                                value={enteredAmount || 0} onChangeText={(text) => setEnteredAmount(text)}
                                inputStyle={styles.inputStyle1}
                                containerStyle={styles.inputContainer1}
                            />
                            <PoppinsText style={styles.symbol}>{"SOL"}</PoppinsText>
                        </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>

            <View style={[styles.stakedBgView, appStyles.row]}>
                <View style={appStyles.rowBasic}>
                    <Image source={Images.solanaLogo} resizeMode='contain' style={styles.tokenLogo} />
                    <View>
                        <PoppinsText style={styles.stakedTitle}>{"Phantom Staked SOL"}</PoppinsText>
                        <PoppinsText style={styles.stakedAmount}>{"7.10% Apy"}</PoppinsText>
                    </View>
                </View>
                <Image source={Images.infoLogo} resizeMode='contain' style={styles.infoLogo} />
            </View>
            <Spacer customHeight={hp(1)} />
            <LineBreak style={styles.lineBreakStyle} />
            <Spacer customHeight={hp(1)} />
            <AvailableAmountView />
            <Spacer customHeight={hp(1)} />
            <CustomButton title={'Next'} onPressBtn={() => props?.navigation.navigate(routes.sendConfirmationScreen)} />
            <Spacer customHeight={hp(1)} />
            <CustomKeyPad onPressNumber={handleNumberPress} onDelete={handleDelete} onLanguage={handleLanguage} />
        </MainContainerApp>
    )
}

export default EnterStakeSolAmount
