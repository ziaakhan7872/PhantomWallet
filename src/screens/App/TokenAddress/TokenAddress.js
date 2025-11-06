import { View, Share, Platform } from 'react-native'
import { AppContainer } from '../../../components/MainContainer'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { Images } from '../../../Images'
import { styles } from './styles'
import PoppinsText from '../../../components/PoppinsText'
import QRCodeStyled from 'react-native-qrcode-styled'
import { copyPaste } from '../../../utilities/helperFunction'
import { AppHeader } from '../../../components/AppHeader'
import { CustomButton } from '../../../components/CustomButton'
import useTokenAddress from './Hooks'
import { colors } from '../../../constants/colors'

const TokenAddress = (props) => {

    const { address, name } = useTokenAddress(props)
    // const { previousSelectedReceiveTokenData, activeTokensData } = useTokenAddress(props)

    const shareAddress = async () => {
        try {
            await Share.share({
                message: `Use this address to receive tokens on ${name}: ${address}`,
            });
        } catch (error) {
            console.log('Error sharing address:', error);
        }
    };

    return (
        <AppContainer>
            <AppHeader leftImage={Images.backArrow} title={`Your ${name} Address`}
                onPressBack={() => props?.navigation.goBack()} />
            <View style={styles.mainView}>
                <View style={styles.scannerView}>
                    <View style={styles.qrview}>
                        <QRCodeStyled
                            data={address}
                            style={{ backgroundColor: colors.gray39, borderRadius: 10 }}
                            padding={Platform.OS == 'ios' ? 10 : 10}
                            pieceSize={6}
                            borderRadius={10}
                        />
                    </View>
                    <Spacer height={hp(1)} />
                    <Spacer />
                    <PoppinsText style={styles.resText}>Your {name} Address</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <PoppinsText style={styles.resText}>{`Use this address to receive tokens and collectibles on ${name}.`}</PoppinsText>
                </View>
            </View>

            <View style={{ paddingBottom: Platform.OS == 'ios' ? hp(5) : hp(3) }}>
                <CustomButton
                    title={`${address?.slice(0, 6)}...${address?.slice(-6)}`}
                    rightImage={Images.copy} titleStyles={styles.titleStyles} btnSyles={styles.customeBtn1}
                    onPressBtn={() => copyPaste.copy(address)}
                />
                <Spacer customHeight={hp(1)} />
                <CustomButton title={'Share'} onPressBtn={() => shareAddress()} />
            </View>
        </AppContainer>
    )
}

export default TokenAddress
