import { useState } from 'react'

const useEnterSendingAmount = (props) => {

    const receiverAddress = props?.route?.params?.receiverAddress
    const item = props?.route?.params?.item

    const [enteredAmount, setEnteredAmount] = useState('')
    const [errormsg, seterrormsg] = useState('')
    const [enterkey, setEnterkey] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isDolorValue, setisDolorValue] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleNumberPress = (num) => {
        setEnteredAmount((prev) => prev + num);
    };

    const handleDelete = () => {
        setEnteredAmount((prev) => prev.slice(0, -1));
    };

    const handleLanguage = () => {
        console.log('Language button pressed');
    };

    return {
        receiverAddress, item,
        enteredAmount, setEnteredAmount,
        errorMessage, setErrorMessage,
        errormsg, seterrormsg,
        enterkey, setEnterkey,
        isDolorValue, setisDolorValue,
        loading, setLoading,
        handleNumberPress, handleDelete, handleLanguage,
    }
}

export default useEnterSendingAmount
