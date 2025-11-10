import { Image, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import PoppinsText from '../../../components/PoppinsText'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import EnterAmount from '../../../components/EnterAmount/EnterAmount'
import useAddFunds from './Hooks'
import { FeeBottomSheet } from './Components'
import { routes } from '../../../constants/routes'
import { hp } from '../../../components/ResponsiveComponent'

const AddFunds = (props) => {
    const { InfoBottomSheet } = useAddFunds()
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <View style={appStyles.row}>
                    <PoppinsText style={styles.fundsText}>Add Funds</PoppinsText>
                    <Image source={Images.cross} resizeMode='contain' style={styles.cross} />
                </View>
                <Spacer />
                <EnterAmount tokenLogo={Images.solanaLogo} tokenName={'Pay SOL'} dollarAmount={'$2.48 available'} feeDollarAmmount={'$0.00'} infoLogo={Images.infoLogo} customCenterButton={true} btnTitle={'Continue'} onPressBtn={() => props?.navigation.navigate(routes.masterPerpetualFuture)} onPressInfo={() => InfoBottomSheet?.current?.open()} />
            </View>
            <FeeBottomSheet InfoBottomSheet={InfoBottomSheet} onPressDone={() => InfoBottomSheet?.current?.close()} />
        </MainContainerApp>
    )
}

export default AddFunds
