import { Animated, Easing, FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stakeOptionData, tokenDetailsInfoData, TokenDetailsRowTabs } from '../../../../components/dummyData'
import Spacer, { HorizontalSpacer } from '../../../../components/Spacer'
import { appStyles } from '../../../../utilities/appStyles'
import PoppinsText from '../../../../components/PoppinsText'
import { colors } from '../../../../constants/colors'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Fonts } from '../../../../constants/fonts'
import { Images } from '../../../../Images'
import { SimpleRBSheet } from '../../../../components/SImpleBottomSheet'
import { usePressAnimation } from '../../../../components/EnterAmount/AnimatedView'

export const TokenDetailsHeader = ({ leftImage, tokenLogo, tokenName, status, isFollowed, onPressBackArrow, onPressFollow }) => {
    return (
        <View style={appStyles.row}>
            <View style={appStyles.rowBasic}>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressBackArrow}>
                    <Image source={leftImage} resizeMode='contain' style={styles.backArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={appStyles.rowBasic}>
                    {tokenName == 'Ethereum' ?
                        <View style={{ backgroundColor: colors.white, borderRadius: 100 }}>
                            <Image source={tokenLogo} resizeMode='contain' style={styles.tokenLogo} />
                        </View>
                        :
                        <Image source={tokenLogo} resizeMode='contain' style={styles.tokenLogo} />
                    }
                    <View style={{ marginLeft: wp(3) }}>
                        <PoppinsText style={styles.tokenName}>{tokenName}</PoppinsText>
                        <View style={appStyles.rowBasic}>
                            <View style={{ width: wp(1.5), height: wp(1.5), backgroundColor: '#008856', borderRadius: 100, marginRight: wp(1) }} />
                            <PoppinsText style={styles.tokenDetailsStatus}>{status}</PoppinsText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.followBtn} onPress={onPressFollow}>
                <PoppinsText style={styles.followText}>{isFollowed ? '✓' : 'Follow'}</PoppinsText>
            </TouchableOpacity>
        </View >
    )
}

export const InfoCard = ({ }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tokenDetailsInfoData}
                keyExtractor={(item) => item?.id.toString()}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                ItemSeparatorComponent={() => <Spacer customHeight={hp(3)} />}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.detailItem}>
                            <View style={appStyles.row}>
                                <PoppinsText style={styles.title}>{item?.title}</PoppinsText>
                                <PoppinsText style={styles.desc}>{item?.desc}</PoppinsText>
                            </View>
                        </View>
                    )
                }}
            />
        </View>

    )
}

export const HistoryCard = ({ onPressToken, transactions = [] }) => {

    const dataToUse = transactions || [];

    return (
        <FlatList
            data={dataToUse}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => {
                const base = item?.txHash || item?.id || index;
                return `${base}-${item?.timestamp || ''}-${index}`;
            }}
            ListEmptyComponent={() => {
                return (
                    <View style={styles.emptyContainer}>
                        <Image source={Images.noHistory} resizeMode='contain' style={styles.noHistory} />
                        <Spacer />
                        <PoppinsText style={styles.noHistoryText}>No Transactions Yet</PoppinsText>
                        <Spacer customHeight={hp(1)} />
                        <PoppinsText style={styles.noHistoryDesc}>Your activity will appear here once you start using the wallet.</PoppinsText>
                        <Spacer customHeight={hp(2)} />
                        <TouchableOpacity activeOpacity={0.8} style={styles.refreshButton} onPress={() => { }}>
                            <Image source={Images.refreshHistory} resizeMode='contain' style={styles.refreshHistory} />
                        </TouchableOpacity>
                    </View>
                )
            }}
            contentContainerStyle={{}}

            renderItem={({ item, index }) => {

                console.log('=== HistoryCard RenderItem ===', item);

                const showDateHeader = index === 0 ||
                    dataToUse[index - 1].date !== item.date;

                return (
                    <View key={`row-${item?.txHash || item?.id || index}`}>
                        {showDateHeader && (
                            <>
                                <Spacer customHeight={hp(1)} />
                                <PoppinsText style={styles.dateText}>{item?.date}</PoppinsText>
                                <Spacer customHeight={hp(1)} />
                            </>
                        )}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPressToken(item)} style={{ paddingVertical: hp(0.6) }}>
                            <ImageBackground source={Images.authMainRoundBox} resizeMode='contain' style={styles.authMainRoundBox}>
                                <View style={appStyles.row}>
                                    <View style={appStyles.rowBasic}>
                                        <Image source={item?.statusLogo} resizeMode='contain' style={styles.statusLogo} />
                                        <View>
                                            <PoppinsText style={styles.status}>{item?.status}</PoppinsText>
                                            <Spacer customHeight={hp(0.5)} />
                                            <PoppinsText style={styles.address}>{item?.address}</PoppinsText>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <PoppinsText style={{
                                            ...styles.amount,
                                            // color: item?.amount?.includes('+') ? colors.green : colors.red
                                            color: colors.gray7
                                        }}>
                                            {item?.amount}
                                        </PoppinsText>
                                        <Spacer customHeight={hp(0.5)} />
                                        <PoppinsText style={{
                                            ...styles.usdValue,
                                            color: item?.usdValue?.includes('+') ? colors.green : colors.red
                                        }}>
                                            {item?.usdValue}
                                        </PoppinsText>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}

export const RowTimeIntervals = ({ selectedTab, setSelectedTab, getGraphData }) => {
    return (

        <View style={styles.tabsContainer}>
            {/* 1H Tab */}
            <TouchableOpacity
                style={[styles.tab, selectedTab === '1H' && styles.selectedTab]}
                onPress={() => {
                    setSelectedTab('1H')
                    getGraphData(2)
                }}
            >
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === '1H' ? colors.lightPurple9 : colors.white,

                }}>1H</PoppinsText>
            </TouchableOpacity>

            {/* 1D Tab */}
            <TouchableOpacity
                style={[styles.tab, selectedTab === '1D' && styles.selectedTab]}
                onPress={() => {
                    setSelectedTab('1D')
                    getGraphData(4)
                }}
            >
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === '1D' ? colors.lightPurple9 : colors.white,
                }}>1D</PoppinsText>
            </TouchableOpacity>

            {/* 1W Tab */}
            <TouchableOpacity
                style={[styles.tab, selectedTab === '1W' && styles.selectedTab]}
                onPress={() => {
                    setSelectedTab('1W')
                    getGraphData(7)
                }}
            >
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === '1W' ? colors.lightPurple9 : colors.white,
                }}>1W</PoppinsText>
            </TouchableOpacity>

            {/* 1M Tab */}
            <TouchableOpacity
                style={[styles.tab, selectedTab === '1M' && styles.selectedTab]}
                onPress={() => {
                    setSelectedTab('1M')
                    getGraphData(30)
                }}
            >
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === '1M' ? colors.lightPurple9 : colors.white,
                }}>1M</PoppinsText>
            </TouchableOpacity>

            {/* 1Y Tab */}
            <TouchableOpacity
                style={[styles.tab, selectedTab === '1Y' && styles.selectedTab]}
                onPress={() => {
                    setSelectedTab('1Y')
                    getGraphData(365)
                }}
            >
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === '1Y' ? colors.lightPurple9 : colors.white,
                }}>1Y</PoppinsText>
            </TouchableOpacity>

            {/* ALL Tab */}
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'ALL' && styles.selectedTab]}
                onPress={() => {
                    setSelectedTab('ALL')
                    getGraphData(700)
                }}
            >
                <PoppinsText style={{
                    ...styles.tabText,
                    color: selectedTab === 'ALL' ? colors.lightPurple9 : colors.white,
                }}>ALL</PoppinsText>
            </TouchableOpacity>
        </View>
    )
}

export const RowTabs = ({ onPressTab, tabAnimationMap }) => {
    return (
        <FlatList
            data={TokenDetailsRowTabs}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            removeClippedSubviews={false}

            ItemSeparatorComponent={() => <HorizontalSpacer customWidth={wp(1)} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: wp(92), justifyContent: 'space-between' }}
            renderItem={({ item }) => {

                const tabAnim = tabAnimationMap[item?.id];
                const scale = tabAnim?.scale;

                return (
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => tabAnim?.handlePressIn()}
                            onPressOut={() => tabAnim?.handlePressOut()}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            // disabled={true}
                            onPress={() => onPressTab(item)}>
                            <ImageBackground source={Images.cardbg} resizeMode='contain' style={{
                                width: wp(22),
                                height: wp(22),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>

                                <Image source={item?.tabLogo} resizeMode='contain' style={styles.tabLogo} />
                                <Spacer customHeight={hp(0.8)} />
                                <PoppinsText style={styles.tabText1}>{item?.title}</PoppinsText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Animated.View>

                )
            }}
        />
    )
}

export const TokenDetailsInfoCard = ({ name, symbol, network, marketCap, totalSupply, circulatingSupply }) => {

    const Name = usePressAnimation();
    const Symbol = usePressAnimation();
    const Network = usePressAnimation();
    const MarketCap = usePressAnimation();
    const TotalSupple = usePressAnimation();
    const CirculatingSupply = usePressAnimation();

    return (
        <View>
            <Animated.View style={{ transform: [{ scale: Name?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={Name?.handlePressIn} onPressOut={Name?.handlePressOut} style={styles.cardContainer}>
                    <View style={appStyles.row}>
                        <PoppinsText style={styles.leftText}>{'Name'}</PoppinsText>
                        <PoppinsText style={styles.rightText}>{name}</PoppinsText>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Spacer customHeight={hp(0.15)} />
            <Animated.View style={{ transform: [{ scale: Symbol?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={Symbol?.handlePressIn} onPressOut={Symbol?.handlePressOut} style={[appStyles.row, styles.cardContainer2]}>
                    <PoppinsText style={styles.leftText}>{'Symbol'}</PoppinsText>
                    <PoppinsText style={styles.rightText}>{symbol?.toUpperCase()}</PoppinsText>
                </TouchableOpacity>
            </Animated.View>

            <Spacer customHeight={hp(0.15)} />
            <Animated.View style={{ transform: [{ scale: Network?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={Network?.handlePressIn} onPressOut={Network?.handlePressOut} style={[appStyles.row, styles.cardContainer2]}>
                    <PoppinsText style={styles.leftText}>{'Network'}</PoppinsText>
                    <PoppinsText style={styles.rightText}>{network}</PoppinsText>
                </TouchableOpacity>
            </Animated.View>

            <Spacer customHeight={hp(0.15)} />
            <Animated.View style={{ transform: [{ scale: MarketCap?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={MarketCap?.handlePressIn} onPressOut={MarketCap?.handlePressOut} style={[appStyles.row, styles.cardContainer2]}>
                    <PoppinsText style={styles.leftText}>{'Market Cap'}</PoppinsText>
                    <PoppinsText style={styles.rightText}>{marketCap && '$' + marketCap}</PoppinsText>
                </TouchableOpacity>
            </Animated.View>

            <Spacer customHeight={hp(0.15)} />
            <Animated.View style={{ transform: [{ scale: TotalSupple?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={TotalSupple?.handlePressIn} onPressOut={TotalSupple?.handlePressOut} style={[appStyles.row, styles.cardContainer2]}>
                    <PoppinsText style={styles.leftText}>{'Total Supply'}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.rightText}>{totalSupply}</PoppinsText>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Spacer customHeight={hp(0.15)} />
            <Animated.View style={{ transform: [{ scale: CirculatingSupply?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={CirculatingSupply?.handlePressIn} onPressOut={CirculatingSupply?.handlePressOut} style={[appStyles.row, styles.cardContainer1]}>
                    <PoppinsText style={styles.leftText}>{'Circulating Supply'}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.rightText}>{circulatingSupply}</PoppinsText>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export const PerformanceCard = ({ totalVolume, totalTraders }) => {

    const volume = usePressAnimation();
    const traders = usePressAnimation();

    return (
        <View>
            <Animated.View style={{ transform: [{ scale: volume?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={volume?.handlePressIn} onPressOut={volume?.handlePressOut} style={[appStyles.row, styles.cardContainer]}>
                    <PoppinsText style={styles.leftText}>{'Volume'}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.performaceRightText}>{totalVolume ? `$${totalVolume}` : '--'}</PoppinsText>
                        <PoppinsText style={styles.performaceRightText1}>{'+2.46%'}</PoppinsText>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Spacer customHeight={hp(0.15)} />
            <Animated.View style={{ transform: [{ scale: traders?.scale }] }}>
                <TouchableOpacity activeOpacity={0.8} onPressIn={traders?.handlePressIn} onPressOut={traders?.handlePressOut} style={[appStyles.row, styles.cardContainer1]}>
                    <PoppinsText style={styles.leftText}>{'Traders'}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.performaceRightText}>{totalTraders ? totalTraders : '--'}</PoppinsText>
                        <PoppinsText style={styles.performaceRightText1}>{'+1.22%'}</PoppinsText>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export const StakeOptionRBSheet = ({ stakeOptionBottomSheet, onPress }) => {
    return (
        <SimpleRBSheet refRBSheet={stakeOptionBottomSheet} height={hp(30)}>
            <FlatList
                data={stakeOptionData}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Spacer />}
                removeClippedSubviews={false}
                renderItem={({ item }) => {
                    return (
                        <>
                            <Spacer customHeight={hp(1)} />
                            <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)} style={{ ...appStyles.rowBasic, paddingHorizontal: wp(3) }}>
                                <Image source={item?.logo} resizeMode='contain' style={styles.stakeLogo} />
                                <PoppinsText style={styles.stakeTitle}>{item?.title}</PoppinsText>
                            </TouchableOpacity>
                        </>
                    )
                }}
            />
        </SimpleRBSheet>
    )
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ChatBox = () => {


    const [chatNumber, setChatNumber] = useState(getRandom(0, 5));
    const [shuffledDummy, setShuffledDummy] = useState([]);


    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: 0.97,
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


    const dummy = [
        Images.avatar1,
        Images.avatar2,
        Images.avatar3,
        Images.avatar4,
        Images.avatar5,
        Images.avatar6,
        Images.avatar7,
        Images.avatar8,
        Images.avatar9,
        Images.avatar10,
        Images.avatar11,
    ];

    // Shuffle helper
    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        // First shuffle
        setShuffledDummy(shuffleArray(dummy));
    }, []);

    useEffect(() => {
        let time = chatNumber == 0 ? 10000 : 5000;

        const interval = setInterval(() => {
            const newNumber = getRandom(0, 5);
            setChatNumber(newNumber);

            // Shuffle dummy array whenever chatNumber changes
            setShuffledDummy(shuffleArray(dummy));
        }, time);

        return () => clearInterval(interval);
    }, [chatNumber]);

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity activeOpacity={0.8} onPressIn={handlePressIn} onPressOut={handlePressOut} style={[appStyles.row, styles.chatBoxContainer]}>
                <View style={appStyles.rowBasic}>

                    {chatNumber == 0 ? null :
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: wp(2) }}>
                            {shuffledDummy?.slice(0, chatNumber)?.map((item, index) => (
                                <Image
                                    key={item?.id}
                                    source={item}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 50,
                                        // borderWidth: 1,
                                        // borderColor: '#fff',
                                        marginLeft: index === 0 ? 0 : -10,   // overlap like FB
                                    }}
                                />
                            ))}
                        </View>
                    }

                    <PoppinsText style={styles.randomNumber}>{chatNumber}
                        <PoppinsText style={styles.chatBoxTitle}>{chatNumber > 0 ? ' chatting...' : ' chatting'}</PoppinsText>
                    </PoppinsText>
                </View>

                <View style={[appStyles.rowBasic, styles.joinChatBtn]}>
                    <PoppinsText style={styles.btnTitle}>Join Chat</PoppinsText>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    followBtn: {
        backgroundColor: colors.gray23,
        borderRadius: 10,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5)
    },
    followText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    //ChatBox
    chatBoxContainer: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: colors.gray14,
        borderRadius: 20,
        padding: wp(4)
    },
    randomNumber: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: '#29a16b'
    },
    chatBoxTitle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.white
    },
    joinChatBtn: {
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.8)
    },
    btnTitle: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    //TokenDetailsHeader
    backArrow: {
        width: wp(3),
        height: wp(4),
        marginRight: wp(3)
    },
    tokenLogo: {
        width: wp(9),
        height: wp(9),
        borderRadius: 100
    },
    tokenName: {
        fontSize: 20,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    tokenDetailsStatus: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4'
    },
    rightImage: {
        width: wp(13),
        height: wp(6)
    },
    // InfoCard
    container: {
        borderWidth: 1,
        borderColor: colors.borderColor1,
        backgroundColor: colors.blueBgColor,
        padding: wp(3),
        borderRadius: 16
    },
    flatListContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
    },
    detailItem: {
        minHeight: hp(2),
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray7,
    },
    desc: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
    },
    // HistoryCard
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // height: hp(70)
    },
    noHistory: {
        width: wp(60),
        height: hp(30),
        alignSelf: 'center'
    },
    noHistoryText: {
        fontSize: 18,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.white,
        textAlign: 'center'
    },
    noHistoryDesc: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray6,
        textAlign: 'center',
        paddingHorizontal: wp(10),
    },
    refreshButton: {
        alignItems: 'center',
    },
    refreshHistory: {
        width: wp(40),
        height: hp(6),
    },
    dateText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.gray6,
    },

    authMainRoundBox: {
        height: hp(8),
        paddingHorizontal: wp(4),
        justifyContent: 'center',
    },
    statusLogo: {
        width: wp(8),
        height: wp(8),
        marginRight: wp(3)
    },
    status: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium,
        color: colors.white
    },
    address: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray6
    },
    amount: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Medium,
    },
    usdValue: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
    },
    backgroundImage: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImageStyle: {
        resizeMode: 'stretch',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    tab: {
        flex: 1,
        height: wp(8),
        borderRadius: 7.5,
        paddingVertical: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Medium,
    },
    tabText1: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Bold,
        color: '#C0C0C0'
    },
    selectedTab: {
        height: wp(7),
        borderRadius: 8,
        paddingVertical: wp(1),
        backgroundColor: '#222222',
        borderWidth: 1,
        borderColor: '#181818',
    },
    gradientText: {
        paddingVertical: 5,
        paddingHorizontal: wp(3),
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    selectedText: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.white,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
    },
    // RowTabs
    tabLogo: {
        width: wp(6),
        height: wp(6),
    },
    // TokenDetailsInfoCard
    cardContainer: {
        width: wp(92),
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#222222',
        padding: wp(3.5)
    },
    cardContainer1: {
        width: wp(92),
        alignSelf: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#222222',
        padding: wp(3.5)
    },
    cardContainer2: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: '#222222',
        padding: wp(3.5)
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray53
    },
    leftText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: '#B4B4B4'
    },
    rightText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white
    },
    // PerformanceCard
    performaceRightText: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.white,
        marginRight: wp(2)
    },
    performaceRightText1: {
        fontSize: 16,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.mainGreenChange
    },
    // StakeOptionRBSheet
    stakeLogo: {
        width: wp(3.5),
        height: wp(2.5),
        marginRight: wp(3)
    },
    stakeTitle: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray88
    }
})