import { Image, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import { hp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { CustomButton } from '../../../components/CustomButton'
import { routes } from '../../../constants/routes'

const AdjustingLeverage = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(8)} />
                <Image source={Images.horizontallySlider3} style={styles.horizontallySlider2} />
                <Spacer customHeight={hp(3)} />
                <PoppinsText style={styles.adjustingLeverageText}>Adjusting Leverage</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.leverageText}>Leverage increases the potential profits and losses
                    when the token price changes.</PoppinsText>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={Images.levereageLogo} resizeMode='contain' style={styles.levereageLogo} />
                    <PoppinsText style={styles.leverageValue}>1x</PoppinsText>
                </View>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Next'} onPressBtn={() => props.navigation.navigate(routes.liquidation)} />
            </View>
        </MainContainerApp>
    )
}

export default AdjustingLeverage
