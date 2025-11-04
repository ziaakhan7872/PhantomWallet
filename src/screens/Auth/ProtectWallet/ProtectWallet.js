import { Image, View } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../components/MainContainer'
import { CustomHeader } from '../../../components/MainHeader'
import { Spacer } from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import PoppinsText from '../../../components/PoppinsText'
import { styles } from './styles'
import { Images } from '../../../Images'
import { CustomButton } from '../../../components/CustomButton'
import useProtectWallet from './Hooks'
import { FaceIDCard } from './Components'
import { routes } from '../../../constants/routes'

const ProtectWallet = (props) => {
    const { isFaceIdEnabled, setIsFaceIdEnabled, onSetToggle } = useProtectWallet();
    return (
        <MainContainer>
            <Spacer customHeight={hp(6)} />
            <View style={styles.mainView}>
                <CustomHeader leftImage={Images.goBackArrow} rightText={''} onPressLeftImage={() => props?.navigation.goBack()} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={Images.purpleLock} resizeMode='contain' style={styles.purpleLock} />
                    <Spacer />
                    <PoppinsText style={styles.title}>Protect your wallet</PoppinsText>
                    <Spacer />
                    <PoppinsText style={styles.desc}>Adding biometric security will ensure that you are the only one that can access your wallet.</PoppinsText>
                    <Spacer />
                    <FaceIDCard isFaceIdEnabled={isFaceIdEnabled} setIsFaceIdEnabled={setIsFaceIdEnabled} onSetToggle={onSetToggle} />
                </View>
            </View>
            <View style={{ paddingBottom: hp(4) }}>
                <CustomButton
                    title={'Next'}
                    onPressBtn={() => props?.navigation.navigate(routes.createUserName)}
                />
            </View>
        </MainContainer>
    )
}

export default ProtectWallet
