import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { appStyles } from '../../../../utilities/appStyles'
import { Images } from '../../../../Images'
import Spacer from '../../../../components/Spacer'
import PoppinsText from '../../../../components/PoppinsText'
import { colors } from '../../../../constants/colors'
import { Fonts } from '../../../../constants/fonts'

export const ReceiveTokensList = ({ activeTokensData, onPressToken, onPressScanner, onPressCopy }) => {

    const evmTokens = activeTokensData?.tokens?.filter(t => t.isEvm === 1);
    const nonEvmTokens = activeTokensData?.tokens?.filter(
        t => t.isEvm === 0 && (t.symbol === 'BTC' || t.symbol === 'SOL')
    );

    console.log(evmTokens, 'evmTokensevmTokensevmTokensevmTokensevmTokensevmTokens');


    return (
        <FlatList
            data={activeTokensData?.tokens}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            removeClippedSubviews={false}
            contentContainerStyle={{ paddingBottom: hp(70) }}
            renderItem={({ item, index }) => {
                console.log(item, 'itemitemitemitem');




                let evmCounts = []
                if (index == 0) {
                    let res = activeTokensData?.tokens?.filter(res => res?.isEvm == 1)
                    evmCounts = res
                }

                if (item?.type == 'token' || (item?.chainName != 'Ethereum' && item?.isEvm == 1))
                    return null


                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressToken(item)} style={styles.tokenCardBgView}>



                        {evmTokens ?
                            <View style={{ ...appStyles.rowBasic, width: wp(75) }}>
                                <FlatList
                                    data={evmCounts?.length > 8 ? evmCounts?.slice(0, 8) : evmCounts}
                                    horizontal
                                    contentContainerStyle={{}}
                                    showsHorizontalScrollIndicator={false}
                                    ListFooterComponent={() => {
                                        return (
                                            <View>
                                                {evmCounts?.length > 8 ?
                                                    <View style={{ marginLeft: wp(-2), borderWidth: 2, borderColor: colors.grey34, borderRadius: 100 }}>
                                                        <Image source={Images.threeDotsWithCircle} resizeMode='contain' style={styles.flimage} />
                                                    </View>
                                                    : null}
                                            </View>
                                        )
                                    }
                                    }
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ marginLeft: wp(index == 0 ? 0 : -2), borderWidth: 2, borderColor: colors.grey34, borderRadius: 100 }}>
                                                <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.flimage} />
                                            </View>
                                        )
                                    }}
                                />
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={appStyles.rowBasic}>
                                    <PoppinsText style={styles.chainText}>{evmCounts?.length} {'Chains'}</PoppinsText>
                                    <Image source={Images.arrowRight} resizeMode='contain' style={styles.rightArrow} />
                                </TouchableOpacity>
                            </View>
                            :
                            <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.logo} />
                        }



                        <View style={appStyles.row}>

                            {evmTokens ?

                                <View style={appStyles.rowBasic}>
                                    <Image source={item?.tokenLogo} resizeMode='contain' style={styles.tokenLogo} />
                                    <View>
                                        <PoppinsText style={styles.tokenName}>{item?.tokenName}</PoppinsText>
                                        <View style={appStyles.rowBasic}>
                                            <PoppinsText style={styles.tokenAddress}>{activeTokensData?.walletAddress
                                                ? `${activeTokensData.walletAddress.slice(0, 6)}...${activeTokensData.walletAddress.slice(-4)}`
                                                : '—'}</PoppinsText>
                                            <View style={styles.tokenTypeBgView}>
                                                <PoppinsText style={styles.evmText}>{'EVM'}</PoppinsText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                : null}
                            <View style={appStyles.rowBasic}>
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
        // height: wp(18),
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
        borderRadius: 12,
        backgroundColor: colors.gray23,
        alignSelf: 'center'
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
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray24
    },
    tokenTypeBgView: {
        borderRadius: 6,
        paddingVertical: wp(0.4),
        paddingHorizontal: wp(2),
        backgroundColor: colors.gray35,
        marginLeft: wp(3)
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
        marginLeft: wp(3)
    },
    flimage: {
        width: wp(7),
        height: wp(7),
        borderRadius: 100
    },
    chainText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray138,
    },
    rightArrow: {
        width: wp(3),
        height: wp(3),
        marginLeft: wp(3)
    },
    logo: {
        width: wp(6),
        height: wp(6),
        borderRadius: 100
    },
})