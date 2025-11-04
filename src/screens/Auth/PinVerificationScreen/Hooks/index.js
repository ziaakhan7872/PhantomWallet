import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { routes } from '../../../../constants/routes';
import ReactNativeBiometrics from 'react-native-biometrics';

const usePinVerificationScreen = (props) => {
  const dispatch = useDispatch();

  const storedPin = useSelector(state => state?.auth?.pin);
  const oldReduxPin = useSelector(state => state?.userdataReducer?.pin); // Fallback to simplified Redux
  const isFaceIdEnabled = useSelector(state => state?.auth?.isFaceIdEnabled);

  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verify PIN when 6 digits are entered
  useEffect(() => {
    if (newPin.length === 6) {
      verifyPinAndLogin();
    }
  }, [newPin]);

  const verifyPinAndLogin = async () => {
    try {
      setIsLoading(true);
      setError('');

      console.log('=== PIN Verification Debug ===');
      console.log('Input PIN:', newPin);
      console.log('Stored PIN (new Redux auth):', storedPin);
      console.log('Stored PIN (old Redux):', oldReduxPin);
      console.log('Input type:', typeof newPin);
      console.log('Stored type (new):', typeof storedPin);
      console.log('Stored type (old):', typeof oldReduxPin);
      console.log('============================');

      // Use old Redux PIN as fallback if new Redux doesn't have it
      const pinToVerify = storedPin || oldReduxPin;

      if (!pinToVerify) {
        console.error('No PIN found in any Redux store!');
        setError('PIN not found. Please restart the app.');
        setIsLoading(false);
        return;
      }

      // Direct comparison as fallback
      if (newPin === pinToVerify) {
        console.log('✅ PIN verified successfully (direct comparison)');

        // Navigate to main app
        props?.navigation?.replace(routes.appStack);
      } else {
        console.error('❌ PIN mismatch - Input:', newPin, 'Expected:', pinToVerify);
        setError('Incorrect PIN. Please try again.');
        setNewPin('');
        setIsLoading(false);
      }

    } catch (error) {
      setError('Incorrect PIN. Please try again.');
      setNewPin('');
      setIsLoading(false);

      console.error('PIN verification failed:', error);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Error', 'Biometric authentication is not available on this device');
        return;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Verify your identity',
      });

      if (success) {
        setIsLoading(true);
        setError('');

        // Navigate to main app
        props?.navigation?.replace(routes.appStack);
      } else {
        setError('Biometric authentication failed');
      }
    } catch (error) {
      console.error('Biometric auth error:', error);
      setError('Biometric authentication failed');
    }
  };

  const HandleKeyPress = (text) => {
    if (error) setError('');

    if (newPin?.length < 6) {
      var array1 = [...newPin, text];
      setNewPin(array1?.join(''));
    }
  };

  const handleRemove = () => {
    if (error) setError('');

    if (newPin.toString().length <= 1) {
      setNewPin('');
    } else {
      setNewPin(newPin?.slice(0, newPin.toString().length - 1));
    }
  };

  return {
    newPin,
    HandleKeyPress,
    handleRemove,
    error,
    isLoading,
    isFaceIdEnabled,
    handleBiometricAuth,
  };
};

export default usePinVerificationScreen;

