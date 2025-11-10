import { View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { Images } from '../../../Images'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { TransactionDetailCard, TransactionDetailCardItem } from './Components'
import PoppinsText from '../../../components/PoppinsText'
import { CustomButton } from '../../../components/CustomButton'
import { NewCustomHeader } from '../../../components/MainHeader'

const SendConfirmationScreen = (props) => {
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <NewCustomHeader title={'Confirmation'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer customHeight={hp(4)} />
                <TransactionDetailCard />
                <Spacer />
                <TransactionDetailCardItem />
                <Spacer customHeight={hp(3)} />
                <View style={{ paddingHorizontal: wp(4) }}>
                    <PoppinsText style={styles.apyText}>Est. APY includes an 4% Phantom fee</PoppinsText>
                    <Spacer />
                    <PoppinsText style={styles.apyText}>When you stake Solana tokens in exchange for PSOL you'll receive a
                        slightly lesser amount of PSOL. A 0.1% fee is charged for withdrawals.</PoppinsText>
                </View>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Stake'} onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default SendConfirmationScreen
