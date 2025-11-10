import { View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { ReceiveTokensList } from './Components'
import { hp } from '../../../components/ResponsiveComponent'
import { NewCustomHeader } from '../../../components/MainHeader'

const ReceiveAccountAddress = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View>
                <NewCustomHeader title={'Receive'} leftImage={Images.backArrow} rightImage={Images.searchWhite} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer />
                <ReceiveTokensList onPressToken={() => { }} onPressScanner={() => { }} onPressCopy={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default ReceiveAccountAddress
