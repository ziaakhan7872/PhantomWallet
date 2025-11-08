import { Image, TouchableOpacity, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { appStyles } from '../../../utilities/appStyles'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { AutoSlippageCard, CustomPercentageCard } from './Components'
import useSlippage from './Hooks'
import { CustomButton } from '../../../components/CustomButton'

const Slippage = (props) => {
    const { halfPercentSlipppage, setHalfPercentSlipppage, onePercentSlipppage, setOnePercentSlipppage, twoPercentSlipppage, setTwoPercentSlipppage, customPercentSlipppage, setCustomePercentSlipppage } = useSlippage()
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <View style={appStyles.rowBasic}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                        <Image source={Images.backArrow} resizeMode='contain' style={styles.backArrow} />
                    </TouchableOpacity>
                    <PoppinsText style={styles.title}>Slippage</PoppinsText>
                </View>
                <Spacer />
                <AutoSlippageCard />
                <Spacer />
                <CustomPercentageCard
                    halfPercentSlipppage={halfPercentSlipppage} setHalfPercentSlipppage={setHalfPercentSlipppage}
                    onePercentSlipppage={onePercentSlipppage} setOnePercentSlipppage={setOnePercentSlipppage}
                    twoPercentSlipppage={twoPercentSlipppage} setTwoPercentSlipppage={setTwoPercentSlipppage}
                    customPercentSlipppage={customPercentSlipppage} setCustomePercentSlipppage={setCustomePercentSlipppage}
                />
                <Spacer />
                <PoppinsText style={styles.desc}>Your transaction will fail if the price changes more than the
                    slippage. Too high of a value will result in an unfavorable
                    trade.</PoppinsText>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title='Done' onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default Slippage
