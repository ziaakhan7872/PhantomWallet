import { View, Share, Platform } from 'react-native'
import { MainContainerApp } from '../../../components/MainContainer'
import Spacer from '../../../components/Spacer'
import { hp } from '../../../components/ResponsiveComponent'
import { Images } from '../../../Images'
import { styles } from './styles'
import PoppinsText from '../../../components/PoppinsText'
import QRCodeStyled from 'react-native-qrcode-styled'
import { copyPaste } from '../../../utilities/helperFunction'
import { CustomButton } from '../../../components/CustomButton'
import useTokenAddress from './Hooks'
import { colors } from '../../../constants/colors'
import { NewCustomHeader, SimpleHeader } from '../../../components/MainHeader'
import { Fonts } from '../../../constants/fonts'

const TokenAddress = (props) => {

    const { address, name } = useTokenAddress(props)
    // const { previousSelectedReceiveTokenData, activeTokensData } = useTokenAddress(props)

    const shareAddress = async () => {
        try {
            // await Share.share({
            //     message: `Use this address to receive tokens on ${name}: ${address}`,
            // });
            await Share.share({
                message: address
            });
        } catch (error) {
            console.log('Error sharing address:', error);
        }
    };

    return (
        <MainContainerApp>
            <Spacer customHeight={hp(6)} />
            <SimpleHeader leftImage={Images.backArrow} title={`Your ${name?.charAt(0).toUpperCase() + name?.slice(1)} Address`} onPressLeftImage={() => props?.navigation.goBack()} />
            <View style={styles.mainView}>
                <View style={styles.scannerView}>
                    <View style={styles.qrview}>
                        <QRCodeStyled
                            data={address}
                            style={{ backgroundColor: colors.gray39 }}
                            padding={5}
                            pieceSize={6}
                            borderRadius={10}
                        />
                    </View>
                    <Spacer height={hp(1)} />
                    <Spacer />
                    <PoppinsText style={styles.resText}>Your {name?.charAt(0).toUpperCase() + name?.slice(1)} Address</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <PoppinsText style={styles.resText1}>{`Use this address to receive tokens and collectibles on `}
                        <PoppinsText style={[styles.resText1, { fontFamily: Fonts.Poppins.Medium, color: colors.gray83 }]}>{name?.charAt(0).toUpperCase() + name?.slice(1)}.</PoppinsText>
                    </PoppinsText>
                </View>
            </View>

            <View style={{ paddingBottom: Platform.OS == 'ios' ? hp(5) : hp(3) }}>
                <CustomButton
                    title={`${address?.slice(0, 8)}...${address?.slice(-6)}`}
                    rightImage={Images.copy} titleStyles={styles.titleStyles} btnSyles={styles.customeBtn1}
                    onPressBtn={() => copyPaste.copy(address)}
                />
                <Spacer customHeight={hp(1)} />
                <CustomButton title={'Share'} onPressBtn={() => shareAddress()} />
            </View>
        </MainContainerApp>
    )
}

export default TokenAddress
