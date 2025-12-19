import { Animated, Easing, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../../../Images'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import PoppinsText from '../../../../components/PoppinsText'
import { Fonts } from '../../../../constants/fonts'
import { colors } from '../../../../constants/colors'
import { appStyles } from '../../../../utilities/appStyles/index'
import { HomeTabs, HorizontalSrcollList, tokensData } from '../../../../components/dummyData'
import Spacer, { HorizontalSpacer } from '../../../../components/Spacer'
import { formatBalancetwoDigit, formatValueTwoDigit, NumberRoundFunction } from '../../../../constants/commonHelperFunctions/commonHelperFunction'
import { getTokenLogo } from '../../Receive/Components'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const AccountCard = ({ profile, logo, accountName, accountNumber, rightImage1, rightImage2, onPressRightImage1, onPressRightImage2, onPressAccount }) => {

    return (
        <View style={appStyles.row}>
            <TouchableOpacity activeOpacity={0.2} onPress={onPressAccount} style={appStyles.rowBasic}>
                {logo ?
                    <View style={{ padding: wp(2.5), borderRadius: 100, backgroundColor: '#222222', alignItems: 'center', justifyContent: 'center', marginRight: wp(2) }}>
                        <PoppinsText style={{ fontSize: 18, textAlign: 'center', }}>{logo ?? '😍'}</PoppinsText>
                    </View>
                    :
                    <Image source={profile} resizeMode='contain' style={styles.profile} />
                }
                <View>
                    {accountName ? <PoppinsText style={styles.accountName}>{accountName}</PoppinsText> : null}
                    <PoppinsText style={styles.accountBalance}>{accountNumber}</PoppinsText>
                </View>
            </TouchableOpacity>
            <View style={appStyles.rowBasic}>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressRightImage1}>
                    <Image source={rightImage1} resizeMode='contain' tintColor={colors.white} style={styles.rightImage1} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressRightImage2}>
                    <Image source={rightImage2} resizeMode='contain' tintColor={colors.white} style={styles.rightImage2} />
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
                {/* <PoppinsText style={[styles.amount, { color: dailyPnl?.pnlAmount?.toString()?.includes('-') ? '#e94f33' : '#29a16b' }]}>{`$${formatValueTwoDigit(dailyPnl?.pnlAmount)}`}</PoppinsText>
                <View style={[styles.dollarAmountBox, { backgroundColor: dailyPnl?.percentChange24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b' }]}>
                    <PoppinsText style={[styles.dollarAmount, { color: dailyPnl?.percentChange24h?.toString()?.includes('-') ? '#000' : '#e94f33' }]}>{`${formatValueTwoDigit(dailyPnl?.percentChange24h)}%`}</PoppinsText>
                </View> */}
                <PoppinsText style={[styles.amount, { color: '#4AA46C' }]}>{`+$${NumberRoundFunction(Math.abs(Number(dailyPnl?.pnlAmount)))}`}</PoppinsText>
                <View style={[styles.dollarAmountBox, { backgroundColor: '#4AA46C' }]}>
                    <PoppinsText style={[styles.dollarAmount, { color: '#111111' }]}>{`+${formatValueTwoDigit(Math.abs(Number(dailyPnl?.percentChange24h)))}%`}</PoppinsText>
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
            scrollEnabled={false}
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
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)} style={[appStyles.row, styles.horizontalBgView, { padding: wp(2), width: wp(85) }]}>
                        <View style={appStyles.rowBasic}>
                            <Image source={item.tokenLogo} resizeMode='contain' style={styles.customTokenLogo} />
                            <PoppinsText style={styles.customTitle}>{item?.title}</PoppinsText>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCross(item)}>
                            <Image source={Images.cross} resizeMode='contain' tintColor={'#B4B4B4'} style={{ width: wp(2.5), height: wp(2.5), marginRight: wp(4), tintColor: '#B4B4B4' }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export const PrepView = ({ }) => {

    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };


    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
                style={[appStyles.rowBasic, styles.horizontalBgView]}>
                <Image source={Images.perpLogo1} resizeMode='contain' style={styles.perpLogo} />
                <View>
                    <PoppinsText style={styles.prepTitle}>{'More Power with Perps'}</PoppinsText>
                    <PoppinsText style={styles.prepDesc}>{'Trade with up to 40x leverage'}</PoppinsText>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export const TokensCard = ({ tokenData, onPressToken, isSkeltonLoading }) => {

    // let data = tokenData?.filter(item => item?.chainName == 'Ethereum') ?? [];
    let data = tokenData ?? [];

    const scaleValues = useState(
        data.reduce((acc, item) => {
            acc[item.id] = new Animated.Value(1);
            return acc;
        }, {})
    )[0];

    const handlePressIn = (id) => {
        Animated.timing(scaleValues[id], {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };

    const handlePressOut = (id) => {
        Animated.timing(scaleValues[id], {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };

    const handlePress = (id, item) => {
        Animated.timing(scaleValues[id], {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();

        onPressToken(item);

        handlePressOut(id);
    };


    return (
        <FlatList
            data={data ?? []}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => {
                if (!scaleValues[item.id]) {
                    // Ensure scale value exists for this item
                    scaleValues[item.id] = new Animated.Value(1);
                }
                return (
                    <>
                        {isSkeltonLoading ?
                            <View style={styles.tokenCardBgView}>
                                <SkeletonPlaceholder backgroundColor="#6F6F6F" highlightColor="#999999">

                                    <View style={appStyles.row}>
                                        <View style={appStyles.rowBasic}>

                                            <SkeletonPlaceholder.Item
                                                width={48}
                                                height={48}
                                                borderRadius={100}
                                            />

                                            <View style={{ marginLeft: wp(3) }}>
                                                <SkeletonPlaceholder.Item
                                                    width={100}
                                                    height={12}
                                                    borderRadius={20}
                                                    style={{ marginBottom: hp(1) }}
                                                />
                                                <SkeletonPlaceholder.Item
                                                    width={70}
                                                    height={12}
                                                    borderRadius={20}
                                                />
                                            </View>
                                        </View>

                                        <View>
                                            <SkeletonPlaceholder.Item
                                                width={60}
                                                height={12}
                                                borderRadius={20}
                                                style={{ marginBottom: hp(1), alignSelf: 'flex-end' }}
                                            />
                                            <SkeletonPlaceholder.Item
                                                width={80}
                                                height={12}
                                                borderRadius={20}
                                                style={{ alignSelf: 'flex-end' }}
                                            />
                                        </View>
                                    </View>
                                </SkeletonPlaceholder>
                            </View>
                            :
                            <Animated.View style={{ transform: [{ scale: scaleValues[item.id] }] }} >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => handlePress(item.id, item)}
                                    onPressIn={() => handlePressIn(item.id)}
                                    onPressOut={() => handlePressOut(item.id)}
                                    style={{ ...styles.tokenCardBgView, }}>
                                    <View style={appStyles.row}>
                                        <View style={appStyles.rowBasic}>
                                            {/* <Image source={{ uri: String(item?.tokenLogo) }} resizeMode='contain' style={styles.tokenLogo} /> */}
                                            {item?.logoURI ?
                                                <View>
                                                    {item?.tokenName == 'Ethereum' ?
                                                        <View style={[styles.tokenLogo2, { backgroundColor: colors.white }]}>
                                                            <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                                        </View>
                                                        :
                                                        <View>
                                                            <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                                        </View>
                                                    }
                                                    {item?.type == 'token' && <Image source={getTokenLogo(item?.chainName)} resizeMode='contain' style={styles.tokenLogoChain} />}
                                                </View>
                                                :
                                                <View style={styles.tokenLogo1}>
                                                    <PoppinsText style={styles.tokenName}>{item?.symbol?.slice(0, 1)?.toUpperCase()}</PoppinsText>
                                                </View>
                                            }
                                            <View style={{ marginLeft: wp(3) }}>
                                                <View style={appStyles.rowBasic}>
                                                    <PoppinsText style={styles.tokenName}>{item?.tokenName}</PoppinsText>
                                                    <Image source={Images.verified} resizeMode='contain' style={styles.verified} />

                                                    {item?.chainName == 'Bitcoin' ?
                                                        <View style={styles.typeView}>
                                                            <PoppinsText style={styles.type}>Taproot</PoppinsText>
                                                        </View>
                                                        :
                                                        item?.chainName == 'bitcoin' ?
                                                            <View style={styles.typeView}>
                                                                <PoppinsText style={styles.type}>Native Segwit</PoppinsText>
                                                            </View>
                                                            : null}
                                                </View>

                                                <Spacer customHeight={hp(0.3)} />
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
                                            <Spacer customHeight={hp(0.3)} />
                                            <PoppinsText style={[styles.dollarPrice, { color: item?.change24h?.toString()?.includes('-') ? '#E54D2E' : '#4AA46C' }]}>
                                                {`${item?.change24h < 0 ? '-' : '+'}$${formatValueTwoDigit(Math.abs(item?.change24h))}`}
                                            </PoppinsText>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        }
                    </>
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
                                        {item?.tokenName == 'Ethereum' ?
                                            <View style={[styles.tokenLogo2, { backgroundColor: colors.white }]}>
                                                <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                            </View>
                                            :
                                            <View>
                                                <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                            </View>
                                        }
                                        {item?.type == 'token' && <Image source={getTokenLogo(item?.chainName) ?? { uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogoChain} />}
                                    </View>
                                    :
                                    <View style={styles.tokenLogo1}>
                                        <PoppinsText style={styles.tokenName}>{item?.symbol?.slice(0, 1)?.toUpperCase()}</PoppinsText>
                                    </View>
                                }
                                <View style={{ marginLeft: wp(3) }}>
                                    <PoppinsText style={styles.tokenName}>{item?.symbol?.toUpperCase()}</PoppinsText>
                                    <PoppinsText style={styles.tokenSymbol1}>{NumberRoundFunction(item?.balance)} {item?.symbol?.toUpperCase()}</PoppinsText>
                                </View>
                            </View>
                            <View>
                                <PoppinsText style={styles.tokenPrice1}>${NumberRoundFunction(
                                    Number(item?.currentPriceUsd),
                                ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}</PoppinsText>
                                <PoppinsText style={[styles.dollarPrice1, { fontSize: 12, color: item?.change24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b' }]}>
                                    {item?.change24h?.toString()?.includes('-') ? '' : '+'}{formatBalancetwoDigit(item?.change24h)}%
                                </PoppinsText>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            }}
        />
    )
}

export const FollowingView = ({ tokenData, onPressToken }) => {
    console.log('tokenDatatokenData:::tokenData', tokenData);

    let data = tokenData?.filter(item => item?.isFollowed == 1) ?? [];
    console.log('tokenDatatokenData:::data', data);

    return (
        <FlatList
            data={data ?? []}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer customHeight={hp(1)} />}
            contentContainerStyle={{}}
            ListEmptyComponent={() => {
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
            }}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressToken(item)} style={{ ...styles.tokenCardBgView1, }}>
                        <View style={appStyles.row}>
                            <View style={appStyles.rowBasic}>
                                {/* <Image source={{ uri: String(item?.tokenLogo) }} resizeMode='contain' style={styles.tokenLogo} /> */}
                                {item?.logoURI ?
                                    <View>
                                        {item?.tokenName == 'Ethereum' ?
                                            <View style={[styles.tokenLogo2, { backgroundColor: colors.white }]}>
                                                <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                            </View>
                                            :
                                            <View>
                                                <Image source={{ uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogo} />
                                            </View>
                                        }
                                        {item?.type == 'token' && <Image source={getTokenLogo(item?.chainName) ?? { uri: item?.logoURI }} resizeMode='contain' style={styles.tokenLogoChain} />}
                                    </View>
                                    :
                                    <View style={styles.tokenLogo1}>
                                        <PoppinsText style={styles.tokenName}>{item?.symbol?.slice(0, 1)?.toUpperCase()}</PoppinsText>
                                    </View>
                                }
                                <View style={{ marginLeft: wp(3) }}>
                                    <PoppinsText style={styles.tokenName}>{item?.symbol?.toUpperCase()}</PoppinsText>
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
                                <PoppinsText style={[styles.dollarPrice1, { color: item?.change24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b' }]}>{formatBalancetwoDigit(item?.change24h)}%</PoppinsText>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            }}
        />
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
        width: wp(9.5),
        height: wp(9.5),
        marginRight: wp(3)
    },
    accountName: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#B1B1B1',
    },
    accountBalance: {
        fontSize: 22,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
    },
    rightImage1: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(5),
        tintColor: colors.white
    },
    rightImage2: {
        width: wp(5),
        height: wp(5),
        tintColor: colors.white
    },

    // BalanceCard
    balanceText: {
        fontSize: 42,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
        // textAlign: 'center'
    },
    amount: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#447E65',
        // textAlign: 'center'
    },
    dollarAmountBox: {
        backgroundColor: '#34A06E',
        paddingHorizontal: wp(1),
        paddingVertical: hp(0.1),
        borderRadius: 7,
        marginLeft: wp(2)
    },
    dollarAmount: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#175232',
    },

    // RowTabs
    tabLogo: {
        width: wp(21.7),
        height: wp(20),
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
        padding: wp(4),
        // backgroundColor: colors.gray14,
        backgroundColor: '#222222',
        borderRadius: 20,
        borderWidth: 0.4,
        borderColor: '#1B1B1B',
    },
    tokenCardBgView1: {
        width: wp(92),
        paddingVertical: hp(1.2),
        borderRadius: 12,
    },
    tokenLogo: {
        width: wp(11.5),
        height: wp(11.5),
        // marginRight: wp(3),
        borderRadius: 100
    },
    tokenLogo2: {
        width: wp(12),
        height: wp(12),
        // marginRight: wp(3),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tokenLogoChain: {
        width: wp(6),
        height: wp(6),
        position: 'absolute',
        bottom: -2,
        right: -2,
        borderWidth: 1,
        borderRadius: 8
    },
    tokenLogo1: {
        width: wp(12),
        height: wp(12),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray136,
    },
    tokenName: {
        fontSize: 18,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    tokenSymbol: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4'
    },
    tokenPrice: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.white,
        textAlign: 'right'
    },
    dollarPrice: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        textAlign: 'right'
    },
    tokenPrice1: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        textAlign: 'right'
    },
    dollarPrice1: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        textAlign: 'right'
    },
    // HorizontalSrcoll
    horizontalBgView: {
        width: wp(92),
        // height: hp(8),
        // backgroundColor: colors.gray14,
        backgroundColor: '#222222',
        borderRadius: 20,
        padding: wp(4),
        borderWidth: 0.4,
        borderColor: '#1B1B1B',
    },
    customTokenLogo: {
        width: wp(13),
        height: wp(13),
        marginRight: wp(2),
        marginLeft: wp(1)
    },
    customTitle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        width: wp(55),
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
        color: colors.white,
    },
    prepDesc: {
        fontSize: 15,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4',
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
        color: colors.white
    },
    tokenSymbol1: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4'
    },
    verified: {
        width: wp(3.5),
        height: wp(3.5),
        marginTop: hp(0.4),
        marginLeft: wp(1)
    },
    typeView: {
        backgroundColor: '#3A3A3A',
        borderRadius: 4,
        paddingHorizontal: wp(1.5),
        paddingVertical: wp(0.5),
        marginLeft: wp(1)
    },
    type: {
        fontSize: 10,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#fff'
    }
})