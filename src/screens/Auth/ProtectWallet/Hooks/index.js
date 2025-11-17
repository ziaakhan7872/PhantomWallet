import { useState } from "react";
import { useDispatch } from "react-redux";
import { SaveFingerPrint } from "../../../../redux/actions/WalletActions";
import ReactNativeBiometrics from "react-native-biometrics";
import { Platform } from "react-native";

const useProtectWallet = () => {
    const rnBiometrics = new ReactNativeBiometrics()
    const dispatch = useDispatch();

    const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);


    const onSetToggle = () => {
        if (isFaceIdEnabled) {
            setIsFaceIdEnabled(false)
            dispatch(SaveFingerPrint(false))
        } else {
            try {
                const promptMessage = Platform.OS === 'ios'
                    ? 'Authenticate with Face ID'
                    : 'Authenticate with Biometrics';

                rnBiometrics?.simplePrompt({ promptMessage: promptMessage })
                    .then((resultObject) => {
                        console.log('resultObject', resultObject);

                        const { success } = resultObject;
                        if (success) {
                            setIsFaceIdEnabled(success)
                            dispatch(SaveFingerPrint(success))
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
        }
    }

    return {
        isFaceIdEnabled, setIsFaceIdEnabled,
        onSetToggle
    }
}

export default useProtectWallet
