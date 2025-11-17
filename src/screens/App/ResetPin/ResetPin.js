import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import { AppHeader } from '../../../components/AppHeader'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { CustomTextInput5 } from '../../../components/CustomTextInput'
import { CustomButton } from '../../../components/CustomButton'
import { colors } from '../../../constants/colors'

const ResetPin = (props) => {
    const [pin, setPin] = useState('')
    return (
        <AppContainer>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.mainView}>
                    <AppHeader title='Reset PIN' leftImage={Images.backArrow} onPressBack={() => props?.navigation.goBack()} />
                    <Spacer customHeight={hp(3)} />
                    <View style={{ alignSelf: 'center' }}>
                        <PoppinsText style={styles.title}>Create a new PIN</PoppinsText>
                        <Spacer />
                        <PoppinsText style={styles.description}>Your PIN will be used to secure this wallet on all your
                            devices.</PoppinsText>
                        <Spacer />
                        <CustomTextInput5 value={pin} onChangeText={(text) => setPin(text)} inputStyle={styles.inputStyle} containerStyle={styles.inputContainer} maxLength={4} keyboardType={'decimal-pad'} />
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Continue'} disabled={pin?.length !== 4} titleStyles={{ color: pin?.length !== 4 ? colors.gray11 : colors.gray11 }} btnSyles={{ backgroundColor: pin?.length !== 4 ? colors.lightPurple15 : colors.purple1 }} onPress={() => { }} />
            </View>
        </AppContainer>
    )
}

export default ResetPin
