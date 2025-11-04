import { Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SaveFingerPrint } from '../../../../redux/actions/WalletActions'
import { routes } from '../../../../constants/routes'

const useImportWalletScreen = (props) => {

    const dispatch = useDispatch()

    const pinCreation = props?.route?.params?.newPin;
    const storedPin = useSelector(state => state?.userdataReducer?.pin);

    const [pin, setPin] = useState('');
    const [seedPhrase, setSeedPhrase] = useState('');
    const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isPinSheetVisible, setIsPinSheetVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSeedPhraseVisible, setIsSeedPhraseVisible] = useState(false);
    const [isContinueLoading, setIsContinueLoading] = useState(false);

    const handleSeedPhraseChange = (text) => {
        setSeedPhrase(text);
    };

    const handleContinue = async () => {
        // Start loading immediately
        setIsLoading(true);

        // Validation
        if (!seedPhrase.trim()) {
            setIsLoading(false);
            Alert.alert('Error', 'Please enter your seed phrase');
            return;
        }

        if (!pinCreation || !storedPin) {
            setIsLoading(false);
            Alert.alert('Error', 'Please create a PIN code');
            return;
        }

        if (!isTermsAccepted) {
            setIsLoading(false);
            Alert.alert('Error', 'Please accept the Terms and Privacy Policy');
            return;
        }

        try {

            // Import wallet from seed phrase
            // const result = await dispatch(importWallet(seedPhrase.trim())).unwrap();

            // Save PIN to database with Face ID setting
            // await dispatch(setupPin({ 
            //     pin: storedPin, 
            //     isFaceIdEnabled: isFaceIdEnabled 
            // })).unwrap();

            // Save Face ID preference
            dispatch(SaveFingerPrint(isFaceIdEnabled));

            // Clear local seed phrase
            setSeedPhrase('');

            setIsLoading(false);

            // Navigate to congratulation screen
            props?.navigation?.navigate(routes.congratulationScreen);

        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', error || 'Failed to import wallet. Please check your seed phrase and try again.');
            console.error('Import wallet error:', error);
        }
    };

    const handlePinCreated = (createdPin) => {
        setPin(createdPin);
        setIsPinSheetVisible(false);
    };

    const toggleTermsAccepted = () => {
        setIsTermsAccepted(!isTermsAccepted);
    };

    const toggleSeedPhraseVisibility = () => {
        setIsSeedPhraseVisible(!isSeedPhraseVisible);
    };

    return {
        pinCreation,
        pin, setPin,
        seedPhrase,
        handleSeedPhraseChange,
        isFaceIdEnabled, setIsFaceIdEnabled,
        isTermsAccepted,
        toggleTermsAccepted,
        isPinSheetVisible, setIsPinSheetVisible,
        handleContinue,
        handlePinCreated,
        isLoading,
        isSeedPhraseVisible,
        toggleSeedPhraseVisibility
    }
}

export default useImportWalletScreen

