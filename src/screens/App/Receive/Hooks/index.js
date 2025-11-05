

const useReceive = (props) => {

    const activeTokensData = props?.route?.params?.activeWalletWithTokens || {}

    return {
        activeTokensData
    }
}

export default useReceive

