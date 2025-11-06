import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import PoppinsText from '../../../../components/PoppinsText'
import { colors } from '../../../../constants/colors'
import { Fonts } from '../../../../constants/fonts'

export const ReceiveTokensList = ({ activeTokensData, onPressScanner, onPressCopy }) => {
    return (
        <View>
            {activeTokensData?.walletAddress?.toString().length > 10 ?
                <View style={styles.tokenCardBgView}>
                    <View style={[appStyles.rowBasic, {}]}>
                        <Image source={Images.ethLogo} resizeMode='contain' style={styles.flimage} />
                        <View>
                            <PoppinsText style={styles.title}>EVM Address</PoppinsText>
                            <PoppinsText style={styles.tokenAddress}>{`${activeTokensData?.walletAddress?.slice(0, 6)}...${activeTokensData?.walletAddress?.slice(-4)}`}</PoppinsText>
                        </View>
                    </View>

                    <View style={appStyles.rowBasic}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressScanner(activeTokensData?.walletAddress, 'EVM')}>
                            <Image source={Images.scannerLogo} resizeMode='contain' style={styles.scanner} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCopy(activeTokensData?.walletAddress)}>
                            <Image source={Images.copyWithRound} resizeMode='contain' style={styles.copyWithRound} />
                        </TouchableOpacity>
                    </View>
                </View>
                : null}


            {activeTokensData?.btcWalletAddress?.toString().length > 10 ?
                <View style={styles.tokenCardBgView}>
                    <View style={[appStyles.rowBasic, {}]}>
                        <Image source={Images.btcLogo} resizeMode='contain' style={styles.flimage} />
                        <View>
                            <PoppinsText style={styles.title}>Bitcoin Address</PoppinsText>
                            <PoppinsText style={styles.tokenAddress}>{`${activeTokensData?.btcWalletAddress?.slice(0, 6)}...${activeTokensData?.btcWalletAddress?.slice(-4)}`}</PoppinsText>
                        </View>
                    </View>

                    <View style={appStyles.rowBasic}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressScanner(activeTokensData?.btcWalletAddress, 'Bitcoin')}>
                            <Image source={Images.scannerLogo} resizeMode='contain' style={styles.scanner} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCopy(activeTokensData?.btcWalletAddress)}>
                            <Image source={Images.copyWithRound} resizeMode='contain' style={styles.copyWithRound} />
                        </TouchableOpacity>
                    </View>
                </View>
                : null}

            {activeTokensData?.solanaWalletAddress?.toString().length > 10 ?
                <View style={styles.tokenCardBgView}>
                    <View style={[appStyles.rowBasic, {}]}>
                        <Image source={Images.solLogo} resizeMode='contain' style={styles.flimage} />
                        <View>
                            <PoppinsText style={styles.title}>Solana Address</PoppinsText>
                            <PoppinsText style={styles.tokenAddress}>{`${activeTokensData?.solanaWalletAddress?.slice(0, 6)}...${activeTokensData?.solanaWalletAddress?.slice(-4)}`}</PoppinsText>
                        </View>
                    </View>

                    <View style={appStyles.rowBasic}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressScanner(activeTokensData?.solanaWalletAddress, 'Solana')}>
                            <Image source={Images.scannerLogo} resizeMode='contain' style={styles.scanner} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCopy(activeTokensData?.solanaWalletAddress)}>
                            <Image source={Images.copyWithRound} resizeMode='contain' style={styles.copyWithRound} />
                        </TouchableOpacity>
                    </View>
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    tokenCardBgView: {
        width: wp(92),
        paddingVertical: hp(2),
        borderRadius: 12,
        backgroundColor: colors.gray23,
        alignSelf: 'center',
        marginTop: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4)
    },
    tokenLogo: {
        width: wp(10.5),
        height: wp(10.5),
        marginRight: wp(3)
    },
    tokenName: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray7
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray7
    },
    tokenAddress: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray24
    },
    tokenTypeBgView: {
        borderRadius: 6,
        paddingVertical: wp(0.4),
        paddingHorizontal: wp(2),
        backgroundColor: colors.gray35,
        marginLeft: wp(3),
        alignSelf: 'flex-start'
    },
    evmText: {
        fontSize: 10,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.white
    },
    scanner: {
        width: wp(9),
        height: wp(9)
    },
    copyWithRound: {
        width: wp(9),
        height: wp(9),
        marginLeft: wp(1)
    },
    flimage: {
        width: wp(10.5),
        height: wp(10.5),
        marginRight: wp(3)
    },
    chainText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray138,
    },
    rightArrow: {
        width: wp(2),
        height: wp(2),
        marginLeft: wp(2),
        tintColor: colors.gray138
    },
    logo: {
        width: wp(4),
        height: wp(4),
        borderRadius: 100
    },
})