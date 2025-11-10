import { Image, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'

const Liquidation = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(8)} />
                <Image source={Images.horizontallySlider4} style={styles.horizontallySlider2} />
                <Spacer customHeight={hp(3)} />
                <PoppinsText style={styles.liquidationText}>Liquidation</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.priceHitsLiquidationPriceText}>If the price hits your liquidation price your position
                    will be closed. Using higher leverage increases the
                    risk of being liquidated.</PoppinsText>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={Images.liquidationLogo} resizeMode='contain' style={styles.liquidationLogo} />
                    <PoppinsText style={styles.leverageValue}>1x</PoppinsText>
                </View>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Next'} onPressBtn={() => props.navigation.navigate(routes.riskTolerance)} />
            </View>
        </MainContainerApp>
    )
}

export default Liquidation
