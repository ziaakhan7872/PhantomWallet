

import { Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SavePin } from '../../../../redux/actions/WalletActions'
import { routes } from '../../../../constants/routes'
import ReactNativeBiometrics from 'react-native-biometrics'
import { StackActions } from '@react-navigation/native'

const usePinScreen = (props) => {

    const splashScreen = props?.route?.params?.splashScreen;
    const isSettingFlow = props?.route?.params?.isSettingFlow

    const rnBiometrics = new ReactNativeBiometrics()

    const dispatch = useDispatch()

    const userPin = useSelector(state => state?.userdataReducer?.pin)
    const isBiometric = useSelector(state => state?.userdataReducer?.isBiometric)

    const [newPin, setNewPin] = useState('');
    const [firstPin, setFirstPin] = useState('');
    const [step, setStep] = useState('create');
    const [error, setError] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        setNewPin('');
        setFirstPin('');
        setStep('create');
        setVerified(false);
        setError('');
        setErrorTitle('');
    }, []);


    useEffect(() => {
        if (isBiometric) {
            handleBiometricAuth()
        }
    }, [])

    useEffect(() => {
        if (newPin.length === 4) {

            if (userPin && userPin.length > 0 && !verified) {
                if (newPin === userPin) {
                    setVerified(true);
                    setNewPin('');
                    setErrorTitle('');
                    if (splashScreen) {
                        props?.navigation?.replace(routes.appStack);
                    } else if (isSettingFlow) {
                        props?.navigation?.replace(routes.MainTabs, { screen: routes.homeScreen });
                    }
                } else {
                    setErrorTitle('Incorrect PIN. Please try again.');
                    setNewPin('');
                    setStep('create');
                    setFirstPin('');
                }
            }
            else {
                if (step === 'create') {
                    setFirstPin(newPin);
                    setNewPin('');
                    setStep('confirm1');
                    setErrorTitle('');
                }
                else {
                    if (newPin === firstPin) {
                        dispatch(SavePin(newPin));
                        props?.navigation?.replace(routes.protectWallet);

                        setNewPin('');
                        setFirstPin('');
                        setStep('create');
                        setErrorTitle('');
                    } else {
                        setErrorTitle('PINs do not match. Please create a new PIN.');
                        setNewPin('');
                        setFirstPin('');
                        setStep('create');
                    }
                }
            }
        }
    }, [newPin]);

    const handleBiometricAuth = () => {
        try {
            const promptMessage = Platform.OS === 'ios'
                ? 'Authenticate with Face ID'
                : 'Authenticate with Biometrics';

            rnBiometrics?.simplePrompt({ promptMessage: promptMessage })
                .then((resultObject) => {
                    const { success } = resultObject;
                    if (success) {
                        props.navigation.dispatch(StackActions.replace(routes.appStack))

                        console.log('Biometric Authentication', 'You are successfully authenticated!');
                    } else {
                        console.log('Authentication Failed', 'Authentication was not successful.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Error', 'Something went wrong with biometric authentication');

                });
        } catch (error) {
        }

    };

    const HandleKeyPress = text => {
        if (errorTitle) {
            setErrorTitle('');
        }

        if (newPin?.length < 4) {
            var array1 = [...newPin, text];
            setNewPin(array1?.join(''));
        }
    };

    const handleRemove = () => {
        if (errorTitle) {
            setErrorTitle('');
        }

        if (newPin.toString().length <= 1) setNewPin('');
        else setNewPin(newPin?.slice(0, newPin.toString().length - 1));
    };

    return {
        splashScreen,
        errorTitle,
        step,
        newPin, setNewPin,
        HandleKeyPress,
        handleRemove
    }
}

export default usePinScreen

