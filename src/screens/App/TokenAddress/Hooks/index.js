

const useTokenAddress = (props) => {

    const previousSelectedReceiveTokenData = props?.route?.params?.item
    const activeTokensData = props?.route?.params?.activeTokensData

    return {
        previousSelectedReceiveTokenData,
        activeTokensData
    }
}

export default useTokenAddress

