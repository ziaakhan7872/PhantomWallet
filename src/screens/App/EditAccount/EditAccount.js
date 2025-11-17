import { Image, TouchableOpacity, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { Images } from '../../../Images'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { appStyles } from '../../../utilities/appStyles'
import { EditAccountCard } from './Components'
import PoppinsText from '../../../components/PoppinsText'
import { routes } from '../../../constants/routes'
import { NewCustomHeader } from '../../../components/MainHeader'

const EditAccount = (props) => {
    const item = props?.route?.params?.item
    const activeWalletWithTokens = props?.route?.params?.activeWalletWithTokens

    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <NewCustomHeader title={'Edit Account'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(3)} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.selectAvatar, { item })} style={{ ...appStyles.rowBasic, alignSelf: 'center' }}>
                    {/* <Image source={Images.accountImage} resizeMode='contain' style={styles.accountImage} /> */}
                    <PoppinsText style={{ fontSize: 62, }}>{item?.logo ?? '😍'}</PoppinsText>
                    <Image source={Images.pencilWithBlackRound1} resizeMode='contain' style={styles.pencilWithBlackRound1} />
                </TouchableOpacity>
                <Spacer customHeight={hp(3)} />
                <EditAccountCard leftText={'Account Name'} leftText1={'Account Addresses'} rightText={item?.name} onPressTitle={() => props?.navigation.navigate(routes.accountName, { item })} onPressDesc={() => props?.navigation.navigate(routes.receive, { activeWalletWithTokens })} />
                <Spacer />
                <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.notifications)} style={[styles.notificationCard, appStyles.row]}>
                    <PoppinsText style={styles.notificationText}>Notifications</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.arrowRight} />
                </TouchableOpacity>

                <Spacer />
                <EditAccountCard leftText={'Show Recovery Phrase'} leftText1={'Show Private Key'} onPressTitle={() => props?.navigation.navigate(routes.showSeedPhrase, { item })} onPressDesc={() => props?.navigation.navigate(routes.showPrivateKey, { item })} />
            </View>
        </MainContainerApp>
    )
}

export default EditAccount
