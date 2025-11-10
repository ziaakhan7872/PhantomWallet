import { Image, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { styles } from './styles'
import PoppinsText from '../../../components/PoppinsText'
import { WalletConnetOptions } from './Components'
import { CustomButton } from '../../../components/CustomButton'
import { NewCustomHeader } from '../../../components/MainHeader'

const ConnectHardware = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <NewCustomHeader title={'Connect Ledger'} leftImage={Images.backArrow} rightImage={Images.questionMark} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(3)} />
                <Image source={Images.connectWalletLogo} resizeMode='contain' style={styles.connectWalletLogo} />
                <Spacer />
                <PoppinsText style={styles.title}>Connect your Ledger hardware wallet</PoppinsText>
                <Spacer customHeight={hp(4)} />
                <WalletConnetOptions />
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Connect your Ledger device'} onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default ConnectHardware
