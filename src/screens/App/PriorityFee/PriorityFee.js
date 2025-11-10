import { Image, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import { CustomButton } from '../../../components/CustomButton'
import { styles } from './styles'
import { appStyles } from '../../../utilities/appStyles'
import { AutoSlippageCard } from './Components'

const PriorityFee = (props) => {
    const [customPriorityFee, setCustomPriorityFee] = useState(false)
    return (
        <MainContainerApp>
            <View style={styles.mainView}>
                <Spacer customHeight={hp(6)} />
                <View style={appStyles.rowBasic}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                        <Image source={Images.backArrow} resizeMode='contain' style={styles.backArrow} />
                    </TouchableOpacity>
                    <PoppinsText style={styles.title}>Priority Fee</PoppinsText>
                </View>
                <Spacer />
                <AutoSlippageCard />
                <Spacer />
                <TouchableOpacity activeOpacity={0.8} onPress={() => setCustomPriorityFee(!customPriorityFee)}
                    style={[appStyles.row, styles.customContainer]}>
                    <PoppinsText style={styles.leftText}>{'Custom'}{' '}
                        <PoppinsText style={styles.customPercentText}>0.00{' '}
                            <PoppinsText style={styles.leftText}>%</PoppinsText>
                        </PoppinsText>
                    </PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <Image source={customPriorityFee ? Images.radioCheckRound : Images.radioUnFill} resizeMode='contain' style={styles.radioBtn} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title='Done' onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default PriorityFee
