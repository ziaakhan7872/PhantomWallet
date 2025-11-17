import { useState } from "react"


const useAccountSettings = (props) => {
    const item = props?.route?.params?.item

    const [searchText, setSearchText] = useState('')

    return {
        item,
        searchText, setSearchText,
    }
}

export default useAccountSettings
