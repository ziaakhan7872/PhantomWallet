import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import { Images } from '../../../Images'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { NetworkCard, NetworkModal } from './Components'
import { CustomTextInput3, CustomTextInput4 } from '../../../components/CustomTextInput'
import { CustomButton } from '../../../components/CustomButton'
import useWatchAddress from './Hooks'
import { styles } from './styles'
import { colors } from '../../../constants/colors'
import PoppinsText from '../../../components/PoppinsText'
import { NewCustomHeader } from '../../../components/MainHeader'

const WatchAddress = (props) => {
    const { name, setName, privateKey, setPrivateKey, showModal, setShowModal, selectedNetwork, setSelectedNetwork } = useWatchAddress(props)
    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.mainView}>
                    <NewCustomHeader title={'Watch Address'} leftImage={Images.backArrow} onPressLeftImage={() => props?.navigation.goBack()} />
                    <Spacer customHeight={hp(3)} />
                    <Image source={Images.eyeWithBlackRound} resizeMode='contain' style={styles.arrowDownWithRound} />
                    <Spacer />
                    <PoppinsText style={styles.desc}>Add an address or domain name you would like to
                        watch. You'll have view-only access and won't be
                        able to sign transactions or messages.</PoppinsText>
                    <Spacer />
                    <NetworkCard title={'Network'} network={selectedNetwork?.title ?? 'Solana'} rightArrow={Images.arrowRight} onPress={() => setShowModal(true)} />
                    <Spacer />
                    <CustomTextInput3 placeholder={'Name'} placeholderTextColor={colors.gray33} value={name} onChangeText={(text) => setName(text)} inputStyle={styles.inputStyle} containerStyle={styles.containerStyle} />
                    <Spacer />
                    <CustomTextInput4 value={privateKey} placeholder={'Address or Domain'} onChangeText={(text) => setPrivateKey(text)} inputStyle={styles.inputStyle1} containerStyle={styles.containerStyle} onPressPaste={() => { }} />
                </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton title={'Import'}
                    disabled={name.trim() == '' || privateKey.trim() == '' ? true : false}
                    titleStyles={name.trim() == '' || privateKey.trim() == '' ? styles.titleStyles : styles.titleStyles1}
                    onPressBtn={() => { }}
                />
            </View>
            <NetworkModal showModal={showModal} setShowModal={setShowModal} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
        </MainContainerApp>
    )
}

export default WatchAddress
