import { Animated, Easing, Image, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MainContainerApp } from '../../../components/MainContainer'
import Spacer, { HorizontalSpacer } from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { styles } from './styles'
import { Images } from '../../../Images'
import useTokenDetails from './Hooks'
import PoppinsText from '../../../components/PoppinsText'
import { appStyles } from '../../../utilities/appStyles'
import { ChatBox, PerformanceCard, RowTabs, RowTimeIntervals, StakeOptionRBSheet, TokenDetailsHeader, TokenDetailsInfoCard } from './Components'
import { Graph } from '../../../components/Grpah'
import { RowButtons } from '../../../components/RowButtons'
import { colors } from '../../../constants/colors'
import { routes } from '../../../constants/routes'
import { CustomModal } from '../../../components/CustomModal'
import { convertBigValues, formatBalancetwoDigit, formatValueTwoDigit, NumberRoundFunction } from '../../../constants/commonHelperFunctions/commonHelperFunction'
import AnimatedView, { usePressAnimation } from '../../../components/EnterAmount/AnimatedView'

const TokenDetails = (props) => {

    const {
        previousTokenData,
        selectedTab, setSelectedTab,
        stakeOptionBottomSheet,
        balanceModalVisible, setBalanceModalVisible,
        balanceValue, setBalanceValue,
        tempBalanceValue, setTempBalanceValue,
        handleOpenModal,
        handleCloseModal,
        handleSaveBalance,
        handleBalanceChange,
        randomPeopleCount,
        graphData,
        graphLoading,
        getGraphData,
        dailyPnl, setDailyPnl,
        tokenInfo,
        showMore, setShowMore,
        isFollowed, setIsFollowed,
        onPressFollow,
        calculate24hReturn,
        totalVolume
    } = useTokenDetails(props);

    console.log('tokenInfotokenInfotokenInfotokenInfo', tokenInfo);

    // REMOVE LATER ONLY FOR TESTINGGGGG /////////////
    const [livePrice, setLivePrice] = useState("0.00");
    const [liveTime, setLiveTime] = useState("");
    // REMOVE LATER ONLY FOR TESTINGGGGG /////////////
    console.log("price::::::price", livePrice);

    const [scale] = useState(new Animated.Value(1));


    const trade = usePressAnimation();
    const activity = usePressAnimation();
    const website = usePressAnimation();
    const telegram = usePressAnimation();
    const twitter = usePressAnimation();

    const buyButton = usePressAnimation();
    const sellButton = usePressAnimation();

    const tab1 = usePressAnimation();
    const tab2 = usePressAnimation();
    const tab3 = usePressAnimation();
    const tab4 = usePressAnimation();

    const tabAnimationMap = {
        1: tab1,
        2: tab2,
        3: tab3,
        4: tab4
    };

    return (
        <MainContainerApp>
            <Spacer customHeight={Platform.OS == 'ios' ? hp(7) : hp(4)} />
            <View style={styles.mainView}>
                <View style={styles.margin}>
                    <TokenDetailsHeader leftImage={Images.backArrow} isFollowed={isFollowed} tokenLogo={{ uri: previousTokenData?.logoURI }} tokenName={previousTokenData?.tokenName ?? ''} status={`${randomPeopleCount ?? '0'} people here`} onPressBackArrow={() => props?.navigation.goBack()} onPressFollow={() => onPressFollow()} />
                    <Spacer />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                    <View style={styles.margin} pointerEvents='box-none'>
                        <PoppinsText style={styles.tokenCurentPrice}>${NumberRoundFunction(Number(livePrice ?? 0))}</PoppinsText>

                        {/* // REMOVE LATER ONLY FOR TESTINGGGGG ///////////// */}
                        {/* <PoppinsText style={styles.tokenCurentPrice}>${dailyPnl?.totalValue}</PoppinsText> */}
                        {/* <PoppinsText style={[styles.tokenCurentPrice, { color: '#ffffff' }]}>-{liveTime}</PoppinsText> */}
                        {/* // REMOVE LATER ONLY FOR TESTINGGGGG ///////////// */}


                        {/* <View style={{ ...appStyles.rowBasic }}>
                            <PoppinsText style={[styles.dollarPrice, { color: previousTokenData?.change24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b' }]}>{`$${formatValueTwoDigit(dailyPnl?.pnlAmount)}`}</PoppinsText>
                            <View style={[styles.percentageRoundBox, { backgroundColor: previousTokenData?.change24h?.toString()?.includes('-') ? '#e94f33' : '#29a16b' }]}>
                                <PoppinsText style={[styles.percentageText, { color: previousTokenData?.change24h?.toString()?.includes('-') ? '#000' : '#e94f33' }]}>{`${formatValueTwoDigit(dailyPnl?.change24h)}%`}</PoppinsText>
                            </View>
                        </View> */}
                        <View style={{ ...appStyles.rowBasic }}>
                            <PoppinsText style={[styles.dollarPrice, { color: colors.mainGreenChange }]}>{`$${formatValueTwoDigit(Math.abs(Number(dailyPnl?.pnlAmount)))}`}</PoppinsText>
                            <View style={[styles.percentageRoundBox, { backgroundColor: '#018551' }]}>
                                <PoppinsText style={[styles.percentageText, { color: '#101010' }]}>{`${formatValueTwoDigit(Math.abs(Number(dailyPnl?.change24h)))}%`}</PoppinsText>
                            </View>
                        </View>
                    </View>

                    <Spacer customHeight={hp(3)} />
                    {/* <Graph graphData={graphData} graphLoading={graphLoading} change24h={dailyPnl?.change24h} selectedTab={selectedTab} /> */}

                    {/* // REMOVE LATER ONLY FOR TESTINGGGGG ///////////// */}
                    <Graph
                        graphData={graphData} graphLoading={graphLoading}
                        change24h={dailyPnl?.change24h}
                        setDailyPnl={setDailyPnl}
                        dailyPnl={dailyPnl}
                        onPriceChange={(price, time) => {
                            setLivePrice(price);
                            setLiveTime(new Date(time).toLocaleString());
                        }}
                    />
                    {/* // REMOVE LATER ONLY FOR TESTINGGGGG ///////////// */}


                    <View style={styles.margin}>
                        <Spacer />
                        <RowTimeIntervals selectedTab={selectedTab} setSelectedTab={setSelectedTab} getGraphData={getGraphData} />

                        <Spacer />
                        <RowTabs
                            onPressTab={(item) => item?.id == 4 ? stakeOptionBottomSheet?.current?.open() : null}
                            tabAnimationMap={tabAnimationMap}
                        />

                        <Spacer />
                        <ChatBox />

                        <Spacer customHeight={hp(3)} />
                        <PoppinsText style={styles.positionText}>Your Position</PoppinsText>

                        <Spacer customHeight={hp(1)} />
                        <View style={appStyles.row}>
                            <TouchableOpacity onPress={handleOpenModal} activeOpacity={0.8} style={styles.bgView}>
                                <PoppinsText style={styles.balanceText}>Balance</PoppinsText>
                                <Spacer customHeight={hp(0.5)} />
                                <PoppinsText style={styles.balance}>{Number(balanceValue) > 0 ? balanceValue : '0'}</PoppinsText>
                            </TouchableOpacity>

                            <View style={styles.bgView}>
                                <PoppinsText style={styles.balanceText}>Value</PoppinsText>
                                <Spacer customHeight={hp(0.5)} />
                                <PoppinsText style={styles.balance}>${NumberRoundFunction(Number(balanceValue ?? 0) * Number(previousTokenData?.currentPriceUsd ?? 0))}</PoppinsText>
                            </View>
                        </View>

                        <Spacer customHeight={hp(0.5)} />
                        <View style={[styles.hourBgView, appStyles.row, { paddingVertical: wp(4) }]}>
                            <PoppinsText style={styles.changeReturn}>24h Return</PoppinsText>
                            <PoppinsText style={[styles.changeAmount, { color: previousTokenData?.change24h?.toString()?.includes('-') ? colors.mainRedChange : colors.mainGreenChange }]}>{`$${NumberRoundFunction(dailyPnl?.pnlAmount)}`}</PoppinsText>
                        </View>

                        <Spacer customHeight={hp(3)} />
                        <PoppinsText style={styles.positionText}>Perps Position</PoppinsText>
                        <Spacer customHeight={hp(1)} />

                        <Animated.View style={{ transform: [{ scale: trade?.scale }] }}>
                            <TouchableOpacity activeOpacity={0.8} onPressIn={trade?.handlePressIn} onPressOut={trade?.handlePressOut} style={[styles.hourBgView, appStyles.rowBasic]}>
                                <Image source={Images.twoRoundsWithCircle} resizeMode='contain' style={[styles.twoRoundsWithCircle, { marginRight: wp(2) }]} />
                                <View>
                                    <PoppinsText style={styles.tradeText}>Trade {previousTokenData?.symbol?.toUpperCase()} perp</PoppinsText>
                                    <PoppinsText style={styles.multiplyText}>Multiply your P&L up to 20x</PoppinsText>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>


                        {previousTokenData?.chainName == 'Solana' ?
                            <>
                                <Spacer />
                                <PoppinsText style={styles.positionText}>Your Stake</PoppinsText>
                                <Spacer customHeight={hp(1)} />
                                <Image source={Images.staking} resizeMode='stretch' style={styles.staking} />
                                {/* <View style={[styles.hourBgView, { padding: wp(5) }]}>
                                    <PoppinsText style={styles.stakeText}>Stake with Phantom</PoppinsText>
                                    <Spacer customHeight={hp(0.3)} />
                                    <PoppinsText style={styles.earnText}>Earn{' '}
                                        <PoppinsText style={styles.percentText}>7.10%{' '}</PoppinsText>
                                        <PoppinsText style={styles.earnText}>per year</PoppinsText>
                                    </PoppinsText>
                                    <Spacer />
                                    <Image source={Images.graphDotLines} resizeMode='contain' style={styles.graphDotLines} />
                                    <Spacer />
                                    <View style={{ alignSelf: 'center', paddingHorizontal: wp(4) }}>
                                        <RowButtons titlebtn1={'Learn More'} titlebtn2={'Start Earning'} titleColor2={colors.green11} style={styles.btn1Container} styleBtn={styles.btn2Container} />
                                    </View>
                                </View> */}
                            </> : null}

                        <Spacer />
                        <PoppinsText style={styles.positionText}>Info</PoppinsText>
                        <Spacer customHeight={hp(1)} />
                        <TokenDetailsInfoCard
                            name={previousTokenData?.tokenName ?? '--'}
                            symbol={previousTokenData?.symbol ?? '--'}
                            network={previousTokenData?.chainName?.charAt(0).toUpperCase() + previousTokenData?.chainName?.slice(1) ?? '--'}
                            marketCap={convertBigValues(tokenInfo?.market_data?.market_cap?.usd ?? 0) ?? '--'}
                            totalSupply={convertBigValues(tokenInfo?.market_data?.total_supply ?? 0) ?? '--'}
                            circulatingSupply={convertBigValues(tokenInfo?.market_data?.circulating_supply ?? 0) ?? '--'}
                        />

                        {tokenInfo?.description?.en ?
                            <View>
                                <Spacer />
                                <PoppinsText style={styles.positionText}>About</PoppinsText>
                                <Spacer customHeight={hp(1)} />
                                <PoppinsText style={styles.desc}>{showMore ? tokenInfo?.description?.en ?? '--' : tokenInfo?.description?.en?.slice(0, 200) + '...'}</PoppinsText>

                                <Spacer customHeight={hp(1)} />
                                {tokenInfo?.description?.en?.length > 200 ?
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowMore(!showMore)}>
                                        <PoppinsText style={styles.showMore}>{showMore ? 'Show Less' : 'Show More'}</PoppinsText>
                                    </TouchableOpacity>
                                    : null}
                            </View>
                            : null}
                        <Spacer />

                        <View style={appStyles.rowBasic}>
                            <Animated.View style={{ transform: [{ scale: website?.scale }] }}>
                                <TouchableOpacity activeOpacity={0.8} onPressIn={website?.handlePressIn} onPressOut={website?.handlePressOut}>
                                    <Image source={Images.website} resizeMode='contain' style={styles.website} />
                                </TouchableOpacity>
                            </Animated.View>

                            <HorizontalSpacer customWidth={wp(1)} />
                            <Animated.View style={{ transform: [{ scale: telegram?.scale }] }}>
                                <TouchableOpacity activeOpacity={0.8} onPressIn={telegram?.handlePressIn} onPressOut={telegram?.handlePressOut}>
                                    <Image source={Images.telegram} resizeMode='contain' style={styles.telegram} />
                                </TouchableOpacity>
                            </Animated.View>

                            <HorizontalSpacer customWidth={wp(1)} />
                            <Animated.View style={{ transform: [{ scale: twitter?.scale }] }}>
                                <TouchableOpacity activeOpacity={0.8} onPressIn={twitter?.handlePressIn} onPressOut={twitter?.handlePressOut}>
                                    <Image source={Images.twitter} resizeMode='contain' style={styles.twitter} />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <Spacer />
                        <PoppinsText style={styles.positionText}>24h Performance</PoppinsText>
                        <Spacer customHeight={hp(1)} />
                        <PerformanceCard totalVolume={convertBigValues(tokenInfo?.market_data?.total_volume?.usd ?? 0)} totalTraders={convertBigValues(tokenInfo?.watchlist_portfolio_users ?? 0) ?? '--'} />

                        <Spacer />
                        <View style={appStyles.row}>
                            <PoppinsText style={styles.positionText}>Activity</PoppinsText>
                            <TouchableOpacity activeOpacity={0.8}>
                                <PoppinsText style={styles.showMore}>See More</PoppinsText>
                            </TouchableOpacity>
                        </View>

                        <Spacer customHeight={hp(1)} />
                        <Animated.View style={{ transform: [{ scale: activity?.scale }] }}>
                            <TouchableOpacity activeOpacity={0.8} onPressIn={activity?.handlePressIn} onPressOut={activity?.handlePressOut} style={[styles.hourBgView, appStyles.row, { padding: wp(4) }]}>
                                <View style={appStyles.rowBasic}>
                                    {previousTokenData?.tokenName == 'Ethereum' ?
                                        <View style={{ backgroundColor: colors.white, borderRadius: 100, marginRight: wp(2) }}>
                                            <Image source={{ uri: previousTokenData?.logoURI }} resizeMode='contain' style={styles.twoRoundsWithCircle} />
                                        </View>
                                        :
                                        <Image source={{ uri: previousTokenData?.logoURI }} resizeMode='contain' style={[styles.twoRoundsWithCircle, { marginRight: wp(2) }]} />
                                    }
                                    <View>
                                        <View style={[appStyles.row, { width: wp(70) }]}>
                                            <PoppinsText style={styles.receivedText}>Received</PoppinsText>
                                            <PoppinsText style={styles.amountCrypto}>+0.01103 {previousTokenData?.symbol?.toUpperCase()}</PoppinsText>
                                        </View>
                                        <PoppinsText style={styles.address}>From CtcB...A8r2</PoppinsText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>

                        <Spacer />
                        <PoppinsText style={styles.resText1}>Past performance is not an indicator of future performance.</PoppinsText>

                        <Spacer />
                        <PoppinsText style={styles.resText1}>Estimated APY is based in part on network inflation rates outside of
                            Phantom's control and may decrease over time.</PoppinsText>

                        <Spacer />
                        <PoppinsText style={styles.resText1}>Trading perpetual contracts involves significant risk, including the
                            potential for sudden and total loss of your investment and collateral
                            due to high leverage and market volatility, and may not be suitable for
                            all users. Prices may be influenced by funding rates and liquidity and
                            you may be subiect to automatic liguidations without notice. Market</PoppinsText>

                        <Spacer customHeight={hp(5)} />
                    </View>
                </ScrollView>
            </View>
            <View style={{ paddingBottom: hp(3), justifyContent: 'center', alignSelf: 'center', backgroundColor: colors.bgColor }}>
                <Spacer customHeight={hp(1)} />
                <RowButtons
                    titlebtn1={'Buy'}
                    titlebtn2={'Sell'}
                    scale1={buyButton?.scale}
                    scale2={sellButton?.scale}
                    onPressInBtn1={buyButton?.handlePressIn}
                    onPressOutBtn1={buyButton?.handlePressOut}
                    onPressInBtn2={sellButton?.handlePressIn}
                    onPressOutBtn2={sellButton?.handlePressOut}
                    titleColor1={colors.white}
                    titleColor2={colors.white}
                    onPressBtn1={() => props?.navigation.navigate(routes.buyMain)}
                    onPressBtn2={() => props?.navigation.navigate(routes.buyMain, { sellTokenFlow: true })}
                    style={styles.bottomBtn1} styleBtn={styles.bottomBtn2}
                />
            </View>
            <StakeOptionRBSheet stakeOptionBottomSheet={stakeOptionBottomSheet}
                onPress={(item) => {
                    if (item?.id == 1) {
                        stakeOptionBottomSheet?.current?.close();
                        props?.navigation.navigate(routes.enterStakeSolAmount);
                    } else if (item?.id == 2) {
                        stakeOptionBottomSheet?.current?.close();
                        props?.navigation.navigate(routes.stakeTokensEarnAwards);
                    }
                }}
            />
            <CustomModal
                visible={balanceModalVisible}
                onRequestClose={handleCloseModal}
                secondViewStyles={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <PoppinsText style={styles.modalTitle}>Edit {previousTokenData?.tokenName == 'Binance Smart Chain' ? 'BNB' : previousTokenData?.tokenName ?? ''} Balance</PoppinsText>
                    <Spacer customHeight={hp(2)} />
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={tempBalanceValue}
                            onChangeText={handleBalanceChange}
                            keyboardType="decimal-pad"
                            placeholder="Enter balance"
                            placeholderTextColor={colors.gray1}
                            style={styles.modalInput}
                            autoFocus={true}
                            cursorColor={colors.white}
                        />
                    </View>
                    <Spacer customHeight={hp(3)} />
                    <View style={appStyles.row}>
                        <TouchableOpacity
                            onPress={handleCloseModal}
                            activeOpacity={0.8}
                            style={[styles.modalButton, styles.cancelButton]}
                        >
                            <PoppinsText style={styles.cancelButtonText}>Cancel</PoppinsText>
                        </TouchableOpacity>
                        <HorizontalSpacer customWidth={wp(3)} />
                        <TouchableOpacity
                            onPress={handleSaveBalance}
                            activeOpacity={0.8}
                            style={[styles.modalButton, styles.saveButton]}
                        >
                            <PoppinsText style={styles.saveButtonText}>Save</PoppinsText>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomModal>
        </MainContainerApp>
    )
}

export default TokenDetails


