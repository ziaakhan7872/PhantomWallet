import { Image, TouchableOpacity, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { styles } from './styles'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import PoppinsText from '../../../components/PoppinsText'
import { hp } from '../../../components/ResponsiveComponent'
import { CustomButton } from '../../../components/CustomButton'
import { appStyles } from '../../../utilities/appStyles'
import useCopyPrivateKey from './Hooks'
import { NewCustomHeader } from '../../../components/MainHeader'

const CopyPrivateKey = (props) => {
    const { isCopy, setPrivateKey, onPressCopy } = useCopyPrivateKey()
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />

            <View style={styles.mainView}>
                <NewCustomHeader title={'Your Private Key'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                <Spacer />
                <View style={styles.alertView}>
                    <PoppinsText style={styles.alertText}>Do not share your Private Key!</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <PoppinsText style={styles.alertDesc}>lf someone has your Private Key they will have full control of your wallet.</PoppinsText>
                </View>
                <Spacer />
                <View style={styles.copyPrivateKeyBgView}>
                    <PoppinsText style={styles.copyPrivateKeyText}>XgqQUjM3BBerTFJCoVkKio8w8U7VivHvgTynDuV3WWh3RgK5WEMKbNx9G1234567890ASDFGHJKERTYUI</PoppinsText>
                </View>
                <Spacer />
                <TouchableOpacity onPress={() => onPressCopy()} style={{ ...appStyles.rowBasic, alignSelf: 'center' }}>
                    {isCopy ? null : <Image
                        source={Images.copy}
                        style={styles.copyimg}
                        resizeMode='contain'
                    />}
                    <PoppinsText style={styles.copyTextStyle}>{isCopy ? 'Copied' : "Copy to clipboard"}</PoppinsText>
                </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Done'} onPressBtn={() => { }} />
            </View>
        </MainContainerApp>
    )
}

export default CopyPrivateKey
