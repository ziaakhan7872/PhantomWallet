import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '../../../../Images'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import PoppinsText from '../../../../components/PoppinsText'
import { Fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import { appStyles } from '../../../../utilities/appStyles/index'
import { HomeTabs, HorizontalSrcollList, tokensData } from '../../../../components/dummyData'
import Spacer, { HorizontalSpacer } from '../../../../components/Spacer'
import { formatBalancetwoDigit, NumberRoundFunction } from '../../../../constants/commonHelperFunctions/commonHelperFunction'
import { getTokenLogo } from '../../Receive/Components'


export const AccountCard = ({ profile, logo, accountName, accountNumber, rightImage1, rightImage2, onPressRightImage1, onPressRightImage2, onPressAccount }) => {
    return (
        <View style={appStyles.row}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressAccount} style={appStyles.rowBasic}>
                <Image source={profile} resizeMode='contain' style={styles.profile} />
                {/* <PoppinsText style={{ fontSize: 36, marginRight: wp(2) }}>{logo ?? '😍'}</PoppinsText> */}
                <View>
                    {accountName ? <PoppinsText style={styles.accountName}>{accountName}</PoppinsText> : null}
                    <PoppinsText style={styles.accountBalance}>{accountNumber}</PoppinsText>
                </View>
            </TouchableOpacity>
            <View style={appStyles.rowBasic}>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressRightImage1}>
                    <Image source={rightImage1} resizeMode='contain' style={styles.rightImage1} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressRightImage2}>
                    <Image source={rightImage2} resizeMode='contain' style={styles.rightImage2} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const BalanceCard = ({ totalBalance, dailyPnl }) => {

    return (
        <View>
            <PoppinsText style={styles.balanceText}>${NumberRoundFunction(totalBalance)}</PoppinsText>
            <View style={{ ...appStyles.rowBasic }}>
                <PoppinsText style={styles.amount}>{`$${NumberRoundFunction(dailyPnl?.pnlAmount)}`}</PoppinsText>
                <View style={styles.dollarAmountBox}>
                    <PoppinsText style={styles.dollarAmount}>{`${NumberRoundFunction(dailyPnl?.percentChange24h)}%`}</PoppinsText>
                </View>
            </View>
        </View>
    )
}

export const RowTabs = ({ onPressTab, }) => {
    return (
        <FlatList
            data={HomeTabs}
            horizontal
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <HorizontalSpacer customWidth={wp(1)} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: wp(92), justifyContent: 'space-between' }}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} style={{}} onPress={() => onPressTab(item)}>
                        <Image source={item.tabLogo} resizeMode='stretch' style={styles.tabLogo} />
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export const HorizontalSrcoll = ({ onPress, onPressCross }) => {
    return (
        <FlatList
            data={HorizontalSrcollList}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <HorizontalSpacer customWidth={wp(2)} />}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)} style={[appStyles.row, styles.horizontalBgView]}>
                        <View style={appStyles.rowBasic}>
                            <Image source={item.tokenLogo} resizeMode='contain' style={styles.customTokenLogo} />
                            <PoppinsText style={styles.customTitle}>{item?.title}</PoppinsText>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCross(item)}>
                            <Image source={Images.cross} resizeMode='contain' style={styles.cross} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export const PrepView = ({ }) => {
    return (
        <View style={[appStyles.rowBasic, styles.horizontalBgView]}>
            <Image source={Images.perpLogo1} resizeMode='contain' style={styles.perpLogo} />
            <View>
                <PoppinsText style={styles.prepTitle}>{'More Power with Perps'}</PoppinsText>
                <PoppinsText style={styles.prepDesc}>{'Trade with up to 40x leverage'}</PoppinsText>
            </View>
        </View>
    )
}

export const TokensCard = ({ tokenData, onPressToken }) => {

    let data = tokenData?.filter(item => item?.chainName == 'Ethereum') ?? [];

    return (
        <FlatList
            data={data ?? []}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressToken(item)} style={{ ...styles.tokenCardBgView, }}>
                        <View style={appStyles.row}>
                            <View style={appStyles.rowBasic}>
                                {/* <Image source={{ uri: String(item?.tokenLogo) }} resizeMode='contain' style={styles.tokenLogo} /> */}
                                {item?.logoURI ?
                                    <View>
                                        <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                        {item?.type == 'token' &&
                                            <Image source={getTokenLogo(item?.chainName)} resizeMode='contain' style={styles.tokenLogoChain} />
                                        }
                                    </View>
                                    :
                                    <View style={styles.tokenLogo1}>
                                        <PoppinsText style={styles.tokenName}>{item?.symbol?.slice(0, 1)?.toUpperCase()}</PoppinsText>
                                    </View>
                                }
                                <View>
                                    <PoppinsText style={styles.tokenName}>{item?.tokenName}</PoppinsText>
                                    <PoppinsText style={styles.tokenSymbol}>{NumberRoundFunction(item?.balance)} {item?.symbol?.toUpperCase()}</PoppinsText>
                                </View>
                            </View>
                            <View>
                                <PoppinsText style={styles.tokenPrice}>${NumberRoundFunction(
                                    Number(item?.currentPriceUsd) * Number(item?.balance),
                                ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}</PoppinsText>
                                <PoppinsText style={[styles.dollarPrice, { color: item?.change24h?.toString()?.includes('-') ? '#7B453E' : '#3D6857' }]}>{formatBalancetwoDigit(item?.change24h)}%</PoppinsText>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            }}
        />
    )
}

export const DiscoverView = ({ tokenData, onPressToken }) => {

    return (
        <FlatList
            data={tokenData ?? []}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressToken(item)} style={{ ...styles.tokenCardBgView1, }}>
                        <View style={appStyles.row}>
                            <View style={appStyles.rowBasic}>
                                {/* <Image source={{ uri: String(item?.tokenLogo) }} resizeMode='contain' style={styles.tokenLogo} /> */}
                                {item?.logoURI ?
                                    <View>
                                        <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                        {item?.type == 'token' &&
                                            <Image source={getTokenLogo(item?.chainName)} resizeMode='contain' style={styles.tokenLogoChain} />
                                        }
                                    </View>
                                    :
                                    <View style={styles.tokenLogo1}>
                                        <PoppinsText style={styles.tokenName}>{item?.symbol?.slice(0, 1)?.toUpperCase()}</PoppinsText>
                                    </View>
                                }
                                <View>
                                    <PoppinsText style={styles.tokenName1}>{item?.symbol?.toUpperCase()}</PoppinsText>
                                    <PoppinsText style={styles.tokenSymbol1}>{NumberRoundFunction(item?.balance)} {item?.symbol?.toUpperCase()}</PoppinsText>
                                </View>
                            </View>
                            <View>
                                <PoppinsText style={styles.tokenPrice1}>${NumberRoundFunction(
                                    Number(item?.currentPriceUsd) * Number(item?.balance),
                                ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}</PoppinsText>
                                <PoppinsText style={[styles.dollarPrice1, { color: item?.change24h?.toString()?.includes('-') ? '#75403B' : '#3F5F51' }]}>{formatBalancetwoDigit(item?.change24h)}%</PoppinsText>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            }}
        />
    )
}

export const FollowingView = () => {
    return (
        <View>
            <Spacer customHeight={hp(1)} />
            <Image source={Images.following} resizeMode='contain' style={styles.followImage} />
            <Spacer customHeight={hp(2)} />
            <PoppinsText style={styles.followingTitle}>Add tokens to your Followings list</PoppinsText>
            <Spacer customHeight={hp(1)} />
            <PoppinsText style={styles.followingDesc}>Stay up to date by 'Following' the tokens you care about the most</PoppinsText>
            <Spacer customHeight={hp(2)} />

            <View style={styles.btnTitleView}>
                <PoppinsText style={styles.btnTitle}>Browse tokens</PoppinsText>
            </View>
        </View>
    )
}

export const TokensTabs = () => {
    return (
        <View style={appStyles.row}>
            <PoppinsText style={{
                ...styles.tabTitle,
                color: colors.gray137
            }}>Tokens
            </PoppinsText>
            {/* <Image source={Images.arrowRight} resizeMode='contain' style={{ width: wp(2), height: wp(3), marginLeft: wp(2) }} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    // AccountCard
    profile: {
        width: wp(9),
        height: wp(9),
        marginRight: wp(3)
    },
    accountName: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray37,
    },
    accountBalance: {
        fontSize: 18,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray38,
    },
    rightImage1: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(5),
    },
    rightImage2: {
        width: wp(5),
        height: wp(5),
    },

    // BalanceCard
    balanceText: {
        fontSize: 42,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray90,
        // textAlign: 'center'
    },
    amount: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Bold,
        color: '#447E65',
        // textAlign: 'center'
    },
    dollarAmountBox: {
        backgroundColor: '#34A06E',
        paddingHorizontal: wp(1),
        paddingVertical: hp(0.2),
        borderRadius: 7,
        marginLeft: wp(2)
    },
    dollarAmount: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#175232',
    },

    // RowTabs
    tabLogo: {
        width: wp(21.7),
        height: wp(21),
    },
    tabText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        textAlign: 'center'
    },
    // TokensCard
    tokenCardBgView: {
        width: wp(92),
        paddingHorizontal: wp(3),
        backgroundColor: colors.gray14,
        paddingVertical: hp(1.5),
        borderRadius: 14,
    },
    tokenCardBgView1: {
        width: wp(92),
        paddingVertical: hp(1.2),
        borderRadius: 12,
    },
    tokenLogo: {
        width: wp(12),
        height: wp(12),
        marginRight: wp(3),
        borderRadius: 100
    },
    tokenLogoChain: {
        width: wp(5),
        height: wp(5),
        position: 'absolute',
        bottom: 0,
        right: wp(2.5),
        borderWidth: 2,
        borderRadius: 8
    },
    tokenLogo1: {
        width: wp(12),
        height: wp(12),
        marginRight: wp(3),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray136,
    },
    tokenName: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray92
    },
    tokenSymbol: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: '#7A7A7A'
    },
    tokenPrice: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Bold,
        color: colors.gray44,
        textAlign: 'right'
    },
    dollarPrice: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        textAlign: 'right'
    },
    // HorizontalSrcoll
    horizontalBgView: {
        width: wp(92),
        // height: hp(8),
        backgroundColor: colors.gray14,
        borderRadius: 14,
        padding: wp(4),
    },
    customTokenLogo: {
        width: wp(10.5),
        height: wp(10.5),
        marginRight: wp(3)
    },
    customTitle: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray15,
        width: wp(60)
    },
    cross: {
        width: wp(3),
        height: wp(3),
    },
    // PrepView
    perpLogo: {
        width: wp(9.5),
        height: wp(9),
        marginRight: wp(3)
    },
    prepTitle: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray7,
    },
    prepDesc: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray16,
        width: wp(60)
    },
    // TokensTabs
    tabTitle: {
        fontSize: 21,
        fontFamily: Fonts.Poppins.SemiBold,
    },
    horizontallyDots: {
        width: wp(4),
        height: 6
    },
    // FollowingView
    followImage: {
        width: wp(12),
        height: wp(12),
        alignSelf: 'center'
    },
    followingTitle: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B9B9B9',
        textAlign: 'center'
    },
    followingDesc: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#A9A9A9',
        textAlign: 'center',
    },
    btnTitleView: {
        backgroundColor: '#292929',
        borderRadius: 10,
        paddingHorizontal: wp(3),
        paddingVertical: wp(2),
        alignSelf: 'center'
    },
    btnTitle: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#ADADAD',
        textAlign: 'center'
    },
    tokenName1: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray86
    },
    tokenSymbol1: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: '#787878'
    },
    tokenPrice1: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray25,
        textAlign: 'right'
    },
    dollarPrice1: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        textAlign: 'right'
    },
})