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
        try {
            const promptMessage = Platform.OS === 'ios'
                ? 'Authenticate with Face ID'
                : 'Authenticate with Biometrics';

            rnBiometrics?.simplePrompt({ promptMessage: promptMessage })
                .then((resultObject) => {
                    const { success } = resultObject;
                    if (success) {
                        setIsFaceIdEnabled(isFaceIdEnabled)
                        dispatch(SaveFingerPrint(isFaceIdEnabled))
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

    return {
        isFaceIdEnabled, setIsFaceIdEnabled,
        onSetToggle
    }
}

export default useProtectWallet
