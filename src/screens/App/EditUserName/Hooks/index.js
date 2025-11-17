import { useEffect, useState } from "react"
import database from "../../../../services/database"
import { routes } from "../../../../constants/routes"




const useEditUserName = (props) => {

    const isBio = props?.route?.params?.isBio
    const item = props?.route?.params?.item

    const [username, setUsername] = useState(item?.username ?? '')
    const [error, setError] = useState('')

    useEffect(() => {
        if (item?.username) {
            setUsername(item?.username)
        }
    }, [item])

    const onPressSave = async () => {
        try {
            if (isBio) { } else {

                if (username.trim().length < 3) {
                    setError('Username must be at least 3 characters long')
                    return
                }
                const updateres = await database.updateWalletName(item?.id, username)
                props?.navigation.replace(routes.MainTabs)
            }
        } catch (error) {
            console.log('catch error in onPressSave:', error);
        }
    }


    return {
        isBio,
        username, setUsername,
        error,
        onPressSave
    }
}

export default useEditUserName

