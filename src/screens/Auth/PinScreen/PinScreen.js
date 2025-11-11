import React, { useRef } from 'react';
import { MainContainer } from '../../../components/MainContainer';
import usePinScreen from './Hooks';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';
import Spacer from '../../../components/Spacer';
import { hp } from '../../../components/ResponsiveComponent';
import { MainHeader } from '../../../components/MainHeader';
import { Images } from '../../../Images';
import PoppinsText from '../../../components/PoppinsText';
import { CustomButton } from '../../../components/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { colors } from '../../../constants/colors';


const PinScreen = (props) => {

  const { splashScreen, step, errorTitle, newPin, setNewPin, handleRemove, HandleKeyPress } = usePinScreen(props)
  const inputRef = useRef(null);

  return (
    <MainContainer>

      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={{ flex: 1 }}>
          <Spacer customHeight={hp(6)} />
          <View style={styles.mainView}>
            <MainHeader leftImage={splashScreen ? null : Images.goBackArrow} centerImage={Images.slider2} onPressLeftImage={() => props?.navigation.goBack()} />
            <Spacer customHeight={hp(3)} />
            <PoppinsText style={styles.pinTitle}>
              {step === 'create' ? 'Create a PIN' : step === 'confirm1' ? 'Confirm PIN' : 'Confirm PIN again'}
            </PoppinsText>
            <Spacer customHeight={hp(0.5)} />
            <PoppinsText style={styles.pinDesc}>This is used to secure your wallet on all your devices.
              <PoppinsText style={styles.pinDesc1}>This cannot be recovered.</PoppinsText>
            </PoppinsText>
            <Spacer />

            <CustomTextInput
              ref={inputRef} placeholder={'....'} value={newPin} onChangeText={(text) => setNewPin(text)}
              inputStyle={styles.input} containerStyle={styles.inputContainer} caretHidden={true} keyboardType='decimal-pad'
            />

            {errorTitle && (
              <>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.errorText}>{errorTitle}</PoppinsText>
              </>
            )}

          </View>
          {/* <View style={styles.btnView}>
            <CustomButton
              title={'Create PIN'}
              titleStyles={styles.btnTitleStyles}
              onPressBtn={() => { }}
            // disabled={newPin.length == 0} btnSyles={{
            //   ...styles.btnSyles,
            //   backgroundColor: newPin.length == 0 ? colors.lightPurple : colors.btnColor
            // }}
            />

          </View> */}
        </View>
      </TouchableWithoutFeedback>
    </MainContainer>
  );
};

export default PinScreen;


