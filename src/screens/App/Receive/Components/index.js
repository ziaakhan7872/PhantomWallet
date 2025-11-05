import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import Spacer from '../../../../components/Spacer'
import PoppinsText from '../../../../components/PoppinsText'
import { colors } from '../../../../constants/colors'
import { Fonts } from '../../../../constants/fonts'

export const ReceiveTokensList = ({ activeTokensData, onPressToken, onPressScanner, onPressCopy }) => {

    console.log(activeTokensData, 'activeTokensDataactiveTokensDataactiveTokensData');

    return (
        <FlatList

            data={activeTokensData?.tokens || []}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => {

                let evmCounts = []
                if (index == 0) {
                    let res = activeTokensData?.tokens?.filter(res => res?.isEvm == 1)
                    evmCounts = res
                }

                if (item?.type == 'token' || (item?.chainName != 'Ethereum' && item?.isEvm == 1))
                    return null


                return (
                    <TouchableOpacity activeOpacity={1} onPress={() => onPressToken(item)} style={styles.tokenCardBgView}>
                        <View style={{ ...appStyles.row, paddingHorizontal: wp(4) }}>

                            {item?.isEvm == 0 ?
                                <View style={{}}>
                                    <View>
                                        <PoppinsText style={styles.tokenAddress}>{`${item?.chainName} Address`}</PoppinsText>
                                        <Spacer customHeight={hp(1)} />
                                        <View style={appStyles.rowBasic}>
                                            <PoppinsText style={styles.tokenAddress}>{item?.tokenName === 'Bitcoin'
                                                ? `${activeTokensData?.btcWalletAddress?.slice(0, 6)}...${activeTokensData?.btcWalletAddress?.slice(-4)}`
                                                : item?.tokenName === 'Solana'
                                                    ? `${activeTokensData?.solanaWalletAddress?.slice(0, 6)}...${activeTokensData?.solanaWalletAddress?.slice(-4)}`
                                                    : `${activeTokensData?.walletAddress?.slice(0, 6)}...${activeTokensData?.walletAddress?.slice(-4)}`
                                            }</PoppinsText>
                                            <View style={styles.tokenTypeBgView}>
                                                <PoppinsText style={styles.evmText}>{item?.tokenName}</PoppinsText>
                                            </View>
                                        </View>
                                        <Spacer customHeight={hp(1)} />
                                        <Image source={item?.chainName == 'bitcoin' ? Images.bitcoinYellowLogo : item?.chainName == 'Solana' ? Images.solanaColorFullLogo : null} resizeMode='contain' style={styles.flimage} />
                                    </View>
                                </View>
                                :
                                <View style={{}}>
                                    <View style={appStyles.rowBasic}>
                                        <View>
                                            <PoppinsText style={styles.tokenAddress}>{'Ethereum Address'}</PoppinsText>
                                            <Spacer customHeight={hp(0.5)} />
                                            <PoppinsText style={styles.tokenAddress}>{`${item?.tokenAddress?.slice(0, 6)}...${item?.tokenAddress?.slice(-4)}`}</PoppinsText>
                                            <Spacer customHeight={hp(1)} />
                                        </View>
                                        <View style={styles.tokenTypeBgView}>
                                            <PoppinsText style={styles.evmText}>{'EVM'}</PoppinsText>
                                        </View>
                                    </View>

                                    <View style={appStyles.rowBasic}>
                                        <FlatList
                                            data={evmCounts?.length > 8 ? evmCounts?.slice(0, 8) : evmCounts}
                                            horizontal
                                            contentContainerStyle={{}}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View style={{ marginLeft: wp(index == 0 ? 0 : -2), borderWidth: 2, borderColor: colors.gray34, borderRadius: 100 }}>
                                                        <Image source={
                                                            item?.chainName == 'Ethereum' ? Images.ethColorFullLogo :
                                                                item?.chainName == 'Binance Smart Chain' ? Images.bnbColorFullLogo :
                                                                    item?.chainName == 'Polygon' ? Images.polygonColorFullLogo :
                                                                        item?.chainName == 'Avalanche' ? Images.avalancheColorFullLogo :
                                                                            item?.chainName == 'Arbitrum' ? Images.arbitrumColorFullLogo :
                                                                                item?.chainName == 'Base' ? Images.baseColorFullLogo :
                                                                                    null
                                                        }
                                                            resizeMode='contain' style={styles.flimage}
                                                        />
                                                    </View>
                                                )
                                            }}
                                        />
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={{ ...appStyles.rowBasic, marginLeft: wp(3) }}>
                                            <PoppinsText style={styles.chainText}>{evmCounts?.length} {'Chains'}</PoppinsText>
                                            <Image source={Images.arrowRight} resizeMode='contain' style={styles.rightArrow} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }

                            <View style={{ ...appStyles.rowBasic, alignSelf: 'flex-start' }}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => onPressScanner(item)}>
                                    <Image source={Images.scannerLogo} resizeMode='contain' style={styles.scanner} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCopy(item)}>
                                    <Image source={Images.copyWithRound} resizeMode='contain' style={styles.copyWithRound} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    tokenCardBgView: {
        width: wp(92),
        paddingVertical: hp(2),
        borderRadius: 12,
        backgroundColor: colors.gray23,
        alignSelf: 'center',
        marginTop: hp(1)
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
        width: wp(6),
        height: wp(6),
        borderRadius: 100
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