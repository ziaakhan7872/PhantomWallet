import { View } from 'react-native'
import { AppContainer, MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import { ReceiveTokensList } from './Components'
import { routes } from '../../../constants/routes'
import { AppHeader } from '../../../components/AppHeader'
import useReceive from './Hooks'
import { copyPaste } from '../../../utilities/helperFunction'
import { hp } from '../../../components/ResponsiveComponent'
import { NewCustomHeader } from '../../../components/MainHeader'

const Receive = (props) => {
    const { activeTokensData } = useReceive(props)

    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <NewCustomHeader title={'Receive'} leftImage={Images.cross} rightImage={Images.searchWhite} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer />
                <ReceiveTokensList
                    activeTokensData={activeTokensData}
                    onPressScanner={(address, name) => props?.navigation.navigate(routes.tokenAddress, { address, name })}
                    onPressCopy={(address) => copyPaste.copy(address)}
                />
            </View>
        </MainContainerApp>
    )
}

export default Receive
