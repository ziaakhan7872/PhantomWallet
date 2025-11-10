import { useState } from "react"
import { ValidateSendAddress } from "../../../../constants/commonHelperFunctions/commonHelperFunction"
import { routes } from "../../../../constants/routes"


const useSendTokenAddress = (props) => {

    const item = props?.route?.params?.item

    const [tokenAddress, setTokenAddress] = useState('')
    const [QrCodeScaner, setQrCodeScaner,] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleQrcode = (adress) => {
        console.log('address from qr code:', adress);
        const parts = adress.split(':');
        if (parts.length === 2) {
            const walletAddress = parts[1];
            setTokenAddress(walletAddress);
        } else {
            setTokenAddress(adress);
        }
    }

    const onNextPress = async () => {
        if (tokenAddress === '') {
            setErrorMessage('Invalid address!');
        } else {
            let isValidAddress = await ValidateSendAddress(item, tokenAddress)
            if (!isValidAddress) {
                setErrorMessage('Invalid address!');
            } else {
                props?.navigation.navigate(routes.enterSendingAmount, { receiverAddress: tokenAddress, item });
            }
        }
    }


    return {
        tokenAddress, setTokenAddress,
        QrCodeScaner, setQrCodeScaner,
        errorMessage, setErrorMessage,
        handleQrcode,
        onNextPress
    }
}

export default useSendTokenAddress
