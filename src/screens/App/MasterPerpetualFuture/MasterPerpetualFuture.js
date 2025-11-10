import { Image, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'

const MasterPerpetualFuture = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(8)} />
                <Image source={Images.horizontallySlider1} style={styles.horizontallySlider1} />
                <Spacer customHeight={hp(3)} />
                <PoppinsText style={styles.masterPerpetualFutureText}>Master Perpetual Futures</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.perpetualFutureText}>With perpetual futures, you're not just trading
                    assets, you're trading what you think will happen
                    next.</PoppinsText>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={Images.perpImage1} resizeMode='contain' style={styles.perpImage1} />
                </View>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Next'} onPressBtn={() => props.navigation.navigate(routes.goLong)} />
            </View>
        </MainContainerApp>
    )
}

export default MasterPerpetualFuture
