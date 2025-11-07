import { useEffect, useState } from "react"


const useSendTokens = (props) => {

    const [searchText, setSearchText] = useState('')
    const [activeWalletWithTokens, setActiveWalletWithTokens] = useState(props?.route?.params?.activeWalletWithTokens ?? {})

    useEffect(() => {
        setActiveWalletWithTokens(props?.route?.params?.activeWalletWithTokens)
    }, [props?.route?.params?.activeWalletWithTokens])

    return {
        searchText, setSearchText,
        activeWalletWithTokens
    }
}

export default useSendTokens
