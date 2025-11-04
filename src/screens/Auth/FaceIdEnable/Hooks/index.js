import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { routes } from '../../../../constants/routes';

const useFaceIdEnable = (props) => {
    const dispatch = useDispatch();
    const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const seedPhrase = props?.route?.params?.seedPhrase;
    const storedPin = useSelector(state => state?.userdataReducer?.getPin);

    const handleWalletCreation = async () => {
        try {
            setIsLoading(true);
            console.log('🚀 Starting wallet creation flow...');

            if (!seedPhrase || seedPhrase.length !== 12) {
                throw new Error('Invalid seed phrase');
            }

            if (!storedPin) {
                throw new Error('PIN not found. Please set up PIN first.');
            }

            setIsLoading(false);

            // Navigate to congratulation screen
            props?.navigation.navigate(routes.congratulationScreen);

        } catch (error) {
            setIsLoading(false);
            console.error('❌ Error creating wallet:', error);
            Alert.alert('Error', error?.message || 'Failed to create wallet. Please try again.');
        }
    };

    return {
        isFaceIdEnabled,
        setIsFaceIdEnabled,
        handleWalletCreation,
        isLoading
    }
}

export default useFaceIdEnable
