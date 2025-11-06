

const useTokenAddress = (props) => {

    const address = props?.route?.params?.address
    const name = props?.route?.params?.name

    return {
        address,
        name
    }
}

export default useTokenAddress

