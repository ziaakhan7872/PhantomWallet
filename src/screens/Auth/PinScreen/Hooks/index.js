

import { } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SavePin } from '../../../../redux/actions/WalletActions'
import { routes } from '../../../../constants/routes'

const usePinScreen = (props) => {

    const dispatch = useDispatch()

    const userPin = useSelector(state => state?.userdataReducer?.pin)

    const [newPin, setNewPin] = useState('');
    const [firstPin, setFirstPin] = useState('');
    const [step, setStep] = useState('create');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [showToast1, setShowToast1] = useState('');
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
        if (newPin.length === 4) {

            if (userPin && userPin.length > 0 && !verified) {
                if (newPin === userPin) {
                    setVerified(true);
                    setNewPin('');
                    setErrorTitle('');
                } else {
                    setErrorTitle('Incorrect PIN. Please try again.');
                    setShowToast(true);
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
                else if (step === 'confirm1') {
                    if (newPin === firstPin) {
                        setNewPin('');
                        setStep('confirm2');
                        setErrorTitle('');
                    } else {
                        setErrorTitle('PINs do not match. Please create a new PIN.');
                        setNewPin('');
                        setFirstPin('');
                        setStep('create');
                    }
                }
                else if (step === 'confirm2') {
                    if (newPin === firstPin) {
                        dispatch(SavePin(newPin));
                        props?.navigation?.replace(routes.protectWallet);

                        setNewPin('');
                        setFirstPin('');
                        setStep('create');
                        setErrorTitle('');
                    } else {
                        setErrorTitle('PINs do not match. Please confirm your PIN again.');
                        setNewPin('');
                        setFirstPin('');
                        setStep('create');
                    }
                }
            }
        }
    }, [newPin]);

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
        errorTitle,
        step,
        newPin, setNewPin,
        HandleKeyPress,
        handleRemove
    }
}

export default usePinScreen

