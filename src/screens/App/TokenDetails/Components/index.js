import { FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { stakeOptionData, tokenDetailsInfoData, TokenDetailsRowTabs } from '../../../../components/dummyData'
import Spacer, { HorizontalSpacer } from '../../../../components/Spacer'
import { appStyles } from '../../../../utilities/appStyles'
import PoppinsText from '../../../../components/PoppinsText'
import { colors } from '../../../../constants/colors'
import { hp, wp } from '../../../../components/ResponsiveComponent'
import { Fonts } from '../../../../constants/fonts'
import { Images } from '../../../../Images'
import { SimpleRBSheet } from '../../../../components/SImpleBottomSheet'

export const TokenDetailsHeader = ({ leftImage, tokenLogo, tokenName, status, rightImage, onPressBackArrow }) => {
    return (
        <View style={appStyles.row}>
            <View style={appStyles.rowBasic}>
                <TouchableOpacity activeOpacity={0.8} onPress={onPressBackArrow}>
                    <Image source={leftImage} resizeMode='contain' style={styles.backArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={appStyles.rowBasic}>
                    <Image source={tokenLogo} resizeMode='contain' style={styles.tokenLogo} />
                    <View style={{ marginLeft: wp(3) }}>
                        <PoppinsText style={styles.tokenName}>{tokenName}</PoppinsText>
                        <PoppinsText style={styles.tokenDetailsStatus}>{status}</PoppinsText>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
                <Image source={rightImage} resizeMode='contain' style={styles.rightImage} />
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
                    color: selectedTab === '1H' ? colors.lightPurple9 : colors.gray53,

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
                    color: selectedTab === '1D' ? colors.lightPurple9 : colors.gray53,
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
                    color: selectedTab === '1W' ? colors.lightPurple9 : colors.gray53,
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
                    color: selectedTab === '1M' ? colors.lightPurple9 : colors.gray53,
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
                    color: selectedTab === '1Y' ? colors.lightPurple9 : colors.gray53,
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
                    color: selectedTab === 'ALL' ? colors.lightPurple9 : colors.gray53,
                }}>ALL</PoppinsText>
            </TouchableOpacity>
        </View>
    )
}

export const RowTabs = ({ onPressTab }) => {
    return (
        <FlatList
            data={TokenDetailsRowTabs}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            removeClippedSubviews={false}

            ItemSeparatorComponent={() => <HorizontalSpacer customWidth={wp(1)} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity activeOpacity={0.8} style={{}} onPress={() => onPressTab(item)}>
                        <Image source={item?.tabLogo} resizeMode='contain' style={styles.tabLogo} />
                    </TouchableOpacity>
                )
            }}
        />
    )
}

export const TokenDetailsInfoCard = ({ }) => {
    return (
        <View>
            <View style={styles.cardContainer}>
                <View style={appStyles.row}>
                    <PoppinsText style={styles.leftText}>{'Name'}</PoppinsText>
                    <PoppinsText style={styles.rightText}>{'Solana'}</PoppinsText>
                </View>
            </View>
            <Spacer customHeight={hp(0.2)} />
            <View style={[appStyles.row, styles.cardContainer2]}>
                <PoppinsText style={styles.leftText}>{'Symbol'}</PoppinsText>
                <PoppinsText style={styles.rightText}>{'SOL'}</PoppinsText>
            </View>
            <Spacer customHeight={hp(0.2)} />
            <View style={[appStyles.row, styles.cardContainer2]}>
                <PoppinsText style={styles.leftText}>{'Network'}</PoppinsText>
                <PoppinsText style={styles.rightText}>{'Solana'}</PoppinsText>
            </View>
            <Spacer customHeight={hp(0.2)} />
            <View style={[appStyles.row, styles.cardContainer2]}>
                <PoppinsText style={styles.leftText}>{'Market Cap'}</PoppinsText>
                <PoppinsText style={styles.rightText}>{'$122.5B'}</PoppinsText>
            </View>
            <Spacer customHeight={hp(0.2)} />
            <View style={[appStyles.row, styles.cardContainer2]}>
                <PoppinsText style={styles.leftText}>{'Total Supply'}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <PoppinsText style={styles.rightText}>{'611.5M'}</PoppinsText>
                </View>
            </View>
            <Spacer customHeight={hp(0.2)} />
            <View style={[appStyles.row, styles.cardContainer1]}>
                <PoppinsText style={styles.leftText}>{'Circulating Supply'}</PoppinsText>
                <View style={appStyles.rowBasic}>
                    <PoppinsText style={styles.rightText}>{'546.21M'}</PoppinsText>
                </View>
            </View>
        </View>
    )
}

export const PerformanceCard = ({ }) => {
    return (
        <View>
            <View style={styles.cardContainer}>
                <View style={appStyles.row}>
                    <PoppinsText style={styles.leftText}>{'Volume'}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.performaceRightText}>{'$15.49B'}</PoppinsText>
                        <PoppinsText style={styles.performaceRightText1}>{'+5.22%'}</PoppinsText>
                    </View>
                </View>
                <Spacer customHeight={hp(0.2)} />
                <View style={[appStyles.row, styles.cardContainer1]}>
                    <PoppinsText style={styles.leftText}>{'Volume'}</PoppinsText>
                    <View style={appStyles.rowBasic}>
                        <PoppinsText style={styles.performaceRightText}>{'$15.49B'}</PoppinsText>
                        <PoppinsText style={styles.performaceRightText1}>{'+5.22%'}</PoppinsText>
                    </View>
                </View>
            </View>
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


const styles = StyleSheet.create({
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
        fontSize: 17,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray63
    },
    tokenDetailsStatus: {
        fontSize: 11,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray109
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
        height: wp(6),
        borderRadius: 7.5,
        paddingVertical: wp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 12,
        fontFamily: Fonts.Poppins.Regular,
    },
    selectedTab: {
        height: wp(6),
        borderRadius: 7.5,
        paddingVertical: wp(1),
        backgroundColor: colors.bottomSheetBgColor
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
        width: wp(22),
        height: hp(9),
    },
    // TokenDetailsInfoCard
    cardContainer: {
        width: wp(92),
        alignSelf: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    cardContainer1: {
        width: wp(92),
        alignSelf: 'center',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    cardContainer2: {
        width: wp(92),
        alignSelf: 'center',
        backgroundColor: colors.gray23,
        padding: wp(3.5)
    },
    title: {
        fontSize: 14,
        fontFamily: Fonts.Poppins.SemiBold,
        color: colors.gray53
    },
    leftText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray26
    },
    rightText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray50
    },
    // PerformanceCard
    performaceRightText: {
        fontSize: 13,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.gray108,
        marginRight: wp(3)
    },
    performaceRightText1: {
        fontSize: 10,
        fontFamily: Fonts.Poppins.Regular,
        color: colors.green12
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