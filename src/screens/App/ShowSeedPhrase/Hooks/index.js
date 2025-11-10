import { useEffect, useState } from "react"
import { generateUniqueMnemonic } from "../../../../EvmWalletHelper"
import { useIsFocused } from "@react-navigation/native"
import { copyPaste } from "../../../../utilities/helperFunction"
const useShowSeedPhrase = (props) => {

    const item = props?.route?.params?.item

    const [isChecked, setIsChecked] = useState(false)
    const [showSeedPhrase, setShowSeedPhrase] = useState(false)
    const [seedPhrase, setseedPhrase] = useState('')
    const [isCopy, setisCopy] = useState(false)


    useEffect(() => {
        setShowSeedPhrase(false)
    }, [useIsFocused()])


    const onPressCopy = () => {
        setisCopy(true)
        copyPaste.copynoToast(item?.seedPhrase)

        setTimeout(() => {
            setisCopy(false)
        }, 1100);

    }

    return {
        item, isChecked, setIsChecked, showSeedPhrase, setShowSeedPhrase, onPressCopy, isCopy,
    }
}

export default useShowSeedPhrase
