import { useState } from 'react'
import { copyPaste } from '../../../../utilities/helperFunction'

const useShowPrivateKey = (props) => {

    const item = props?.route?.params?.item

    const [isChecked, setIsChecked] = useState(false)
    const [showPrivateKey, setShowPrivateKey] = useState('')
    const [isCopy, setisCopy] = useState('')

    const onPressCopy = () => {
        setisCopy(true)
        copyPaste.copynoToast(item?.privateKey)

        setTimeout(() => {
            setisCopy(false)
        }, 1100);

    }

    return {
        item,
        isChecked, setIsChecked,
        showPrivateKey, setShowPrivateKey,
        isCopy, onPressCopy
    }
}

export default useShowPrivateKey
