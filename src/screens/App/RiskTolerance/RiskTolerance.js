import { Image, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { Images } from '../../../Images'
import { hp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { CustomButton } from '../../../components/CustomButton'
import { RiskToleranceOptions } from './Components'
import { routes } from '../../../constants/routes'

const RiskTolerance = (props) => {
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(8)} />
                <Image source={Images.horizontallySlider6} style={styles.horizontallySlider6} />
                <Spacer customHeight={hp(3)} />
                <PoppinsText style={styles.riskToleranceText}>What Is Your Risk Tolerance?</PoppinsText>
                <Spacer customHeight={hp(1)} />
                <PoppinsText style={styles.riskToleranceDesc}>Your leverage will be set based on your risk
                    tolerance, but you can always adjust it when
                    opening a position.</PoppinsText>
                <Spacer />
                <RiskToleranceOptions />
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Start Trading'} onPressBtn={() => props?.navigation.navigate(routes.MainTabs)} />
            </View>
        </MainContainerApp>
    )
}

export default RiskTolerance
