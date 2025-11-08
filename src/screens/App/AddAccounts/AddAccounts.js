import { View } from 'react-native'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { AddAccountsList } from './Components'
import { routes } from '../../../constants/routes'
import { NewCustomHeader } from '../../../components/MainHeader'
import { MainContainerApp } from '../../../components/MainContainer'

const AddAccounts = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <NewCustomHeader title={'Add Account'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(3)} />
                <AddAccountsList leftImage={Images.plusWithRound} title={'Create New Account'} description={'Add a new multi-chain account'} onPress={() => props?.navigation.navigate(routes.createAccount)} />
                <Spacer customHeight={hp(1)} />

                <AddAccountsList leftImage={Images.connectWithRound} title={'Connect Hardware Wallet'} description={'Use your Ledger hardware wallet'} onPress={() => props?.navigation.navigate(routes.connectHardware)} />
                <Spacer customHeight={hp(1)} />

                <AddAccountsList leftImage={Images.importWithRound} title={'Import Recovery Phrase'} description={'Import accounts from another wallet'} onPress={() => props?.navigation.navigate(routes.seedPhrase, { isAddAccountFlow: true })} />
                <Spacer customHeight={hp(1)} />

                <AddAccountsList leftImage={Images.arrowWithRound} title={'Import Private Key'} description={'Import a single-chain account'} onPress={() => props?.navigation.navigate(routes.importPrivateKey)} />
                <Spacer customHeight={hp(1)} />

                <AddAccountsList leftImage={Images.eyeWithRound} title={'Watch Address'} description={'Track any public wallet address'} onPress={() => props?.navigation.navigate(routes.watchAddress)} />
            </View>
        </MainContainerApp>
    )
}

export default AddAccounts
