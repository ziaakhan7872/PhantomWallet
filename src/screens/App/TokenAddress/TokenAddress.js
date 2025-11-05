import { View, Share, Platform } from 'react-native'
import { AppContainer } from '../../../components/MainContainer'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { Images } from '../../../Images'
import { styles } from './styles'
import PoppinsText from '../../../components/PoppinsText'
import QRCodeStyled from 'react-native-qrcode-styled'
import { colors } from 'react-native-elements'
import { copyPaste } from '../../../utilities/helperFunction'
import { AppHeader } from '../../../components/AppHeader'
import { CustomButton } from '../../../components/CustomButton'
import useTokenAddress from './Hooks'

const TokenAddress = (props) => {

    const { previousSelectedReceiveTokenData, activeTokensData } = useTokenAddress(props)

    const shareAddress = async () => {
        try {
            let address = '';
            let chainLabel = '';

            if (previousSelectedReceiveTokenData?.chainName?.toLowerCase() === 'bitcoin') {
                address = activeTokensData?.btcWalletAddress;
                chainLabel = 'Bitcoin';
            } else if (previousSelectedReceiveTokenData?.chainName?.toLowerCase() === 'solana') {
                address = activeTokensData?.solanaWalletAddress;
                chainLabel = 'Solana';
            } else {
                address = activeTokensData?.walletAddress;
                chainLabel = previousSelectedReceiveTokenData?.chainName || 'EVM';
            }

            await Share.share({
                message: `Use this address to receive tokens on ${chainLabel}: ${address}`,
            });
        } catch (error) {
            console.log('Error sharing address:', error);
        }
    };

    return (
        <AppContainer>
            <AppHeader leftImage={Images.backArrow} title={'Your Solana Address'} onPressBack={() => props?.navigation.goBack()} />
            <View style={styles.mainView}>
                <View style={styles.scannerView}>
                    <View style={styles.qrview}>
                        <QRCodeStyled
                            data={'TTBJhV6Db8jl2B...P8tPkG1p5'}
                            style={{ backgroundColor: colors }}
                            // padding={Platform.OS == 'ios' ? 10 : 15}
                            pieceSize={6}
                        />
                    </View>
                    <Spacer height={hp(1)} />
                    <Spacer />
                    <PoppinsText style={styles.resText}>Your {previousSelectedReceiveTokenData?.chainName} Address</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <PoppinsText style={styles.resText}>Use this address to receive tokens and collectibles on Solana.</PoppinsText>
                </View>
            </View>

            <View style={{ paddingBottom: Platform.OS == 'ios' ? hp(5) : hp(3) }}>
                <CustomButton
                    title={previousSelectedReceiveTokenData?.chainName === 'bitcoin'
                        ? `${activeTokensData?.btcWalletAddress?.slice(0, 6)}...${activeTokensData?.btcWalletAddress?.slice(-6)}`
                        : previousSelectedReceiveTokenData?.chainName === 'Solana'
                            ? `${activeTokensData?.solanaWalletAddress?.slice(0, 6)}...${activeTokensData?.solanaWalletAddress?.slice(-6)}`
                            : `${activeTokensData?.walletAddress?.slice(0, 6)}...${activeTokensData?.walletAddress?.slice(-6)}`
                    }
                    rightImage={Images.copy} titleStyles={styles.titleStyles} btnSyles={styles.customeBtn1}
                    onPressBtn={() => {
                        const address =
                            previousSelectedReceiveTokenData?.chainName === 'bitcoin'
                                ? activeTokensData?.btcWalletAddress
                                : previousSelectedReceiveTokenData?.chainName === 'Solana'
                                    ? activeTokensData?.solanaWalletAddress
                                    : activeTokensData?.walletAddress;

                        copyPaste.copy(address);
                    }}
                />
                <Spacer customHeight={hp(1)} />
                <CustomButton title={'Share'} onPressBtn={() => shareAddress()} />
            </View>
        </AppContainer>
    )
}

export default TokenAddress
