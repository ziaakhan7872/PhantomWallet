import { View } from 'react-native'
import { AppContainer } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import { ReceiveTokensList } from './Components'
import { routes } from '../../../constants/routes'
import { AppHeader } from '../../../components/AppHeader'
import useReceive from './Hooks'
import { copyPaste } from '../../../utilities/helperFunction'

const Receive = (props) => {
    const { activeTokensData } = useReceive(props)

    return (
        <AppContainer>
            <View style={styles.mainView}>
                <AppHeader leftImage={Images.cross} title={'Receive'} onPressBack={() => props?.navigation.goBack()} />
                <Spacer />
                <ReceiveTokensList
                    activeTokensData={activeTokensData}
                    onPressScanner={(address, name) => props?.navigation.navigate(routes.tokenAddress, { address, name })}
                    onPressCopy={(address) => copyPaste.copy(address)}
                />
            </View>
        </AppContainer>
    )
}

export default Receive
