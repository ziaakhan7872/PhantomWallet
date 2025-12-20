import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Animated, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useCallback } from 'react'
import useMoreTokens from './Hook';
import { MainContainerApp } from '../../../components/MainContainer';
import { hp, wp } from '../../../components/ResponsiveComponent';
import Spacer from '../../../components/Spacer';
import { BalanceCard, PrepView, RowTabs, TokensCard } from '../HomeScreen/Components';
import { routes } from '../../../constants/routes';
import { appStyles } from '../../../utilities/appStyles';
import { Images } from '../../../Images';
import PoppinsText from '../../../components/PoppinsText';
import { styles } from './styles';
import { colors } from '../../../constants/colors';

const MoreTokens = (props) => {
    const {
        activeWalletWithTokens,
        totalBalance,
        discoverTitle, setDiscoverTitle,
        refreshing,
        isSkeltonLoading,
        dailyPnl,
        onRefresh
    } = useMoreTokens(props);


    const sorted = activeWalletWithTokens?.tokens?.sort((a, b) => {
        const valueA = Number(a.balance) * Number(a.currentPriceUsd);
        const valueB = Number(b.balance) * Number(b.currentPriceUsd);
        return valueB - valueA; // high → low
    });

    const scrollY = useRef(new Animated.Value(0)).current;
    const [pullDistance, setPullDistance] = useState(0);
    const pullDistanceRef = useRef(0);
    const REFRESH_THRESHOLD = 80;

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                if (offsetY < 0) {
                    const distance = Math.abs(offsetY);
                    setPullDistance(distance);
                    pullDistanceRef.current = distance;
                } else {
                    setPullDistance(0);
                    pullDistanceRef.current = 0;
                }
            }
        }
    );

    const handleScrollEndDrag = useCallback(() => {
        if (pullDistanceRef.current >= REFRESH_THRESHOLD && !refreshing) {
            onRefresh();
        }
        setPullDistance(0);
        pullDistanceRef.current = 0;
    }, [refreshing, onRefresh]);

    return (
        <MainContainerApp style={{ paddingHorizontal: wp(4) }}>
            <Spacer customHeight={hp(Platform.OS === 'ios' ? 7 : 4)} />

            <View style={appStyles.row}>
                <View style={appStyles.rowBasic}>
                    <TouchableOpacity hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }} activeOpacity={0.8} onPress={() => props?.navigation.goBack()}>
                        <Image source={Images.backArrow} resizeMode='contain' style={{ width: wp(3.5), height: wp(3.5), marginRight: wp(3) }} />
                    </TouchableOpacity>
                    <PoppinsText style={styles.prepTitle}>Tokens</PoppinsText>
                </View>
                <Image source={Images.setting} resizeMode='contain' style={{ width: wp(5), height: wp(5) }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false} 
                nestedScrollEnabled={true} 
                contentContainerStyle={{ paddingBottom: hp(8) }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onScrollEndDrag={handleScrollEndDrag}
                bounces={true}
                overScrollMode="always">
                {/* Custom pull-to-refresh indicator */}
                {(pullDistance > 0 || refreshing) && (
                    <View 
                        style={{
                            height: refreshing ? hp(6) : pullDistance,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <ActivityIndicator 
                            size="small" 
                            color={'#ffffff'} 
                            animating={pullDistance >= REFRESH_THRESHOLD || refreshing}
                        />
                    </View>
                )}
                <View>
                    <Spacer customHeight={hp(1)} />
                    <BalanceCard totalBalance={totalBalance} dailyPnl={dailyPnl} />


                    <Spacer customHeight={hp(2)} />
                    <RowTabs onPressTab={(item) => {
                        console.log('RowTabs item:', item);
                        if (item?.id === 1) {
                            props?.navigation.navigate(routes.receive, { activeWalletWithTokens })
                        } else if (item?.id === 2) {
                            props?.navigation.navigate(routes.sendTokens, { activeWalletWithTokens })
                        }
                        else if (item?.id === 3) {
                            props?.navigation.navigate(routes.swapMain)
                        }
                        else if (item?.id === 4) {
                            props?.navigation.navigate(routes.buyFromHome)
                        }
                    }} />

                    {/* <Spacer />
                <HorizontalSrcoll onPress={(item) => { }} onPressCross={(item) => { }} /> */}
                </View>

                // tokens
                <Spacer customHeight={hp(2)} />
                <TokensCard
                    tokenData={sorted ?? []}
                    isSkeltonLoading={isSkeltonLoading}
                    onPressToken={(item) => props?.navigation.navigate(routes.tokenDetails, { tokenData: item })}
                />
            </ScrollView>

        </MainContainerApp>
    )
}

export default MoreTokens