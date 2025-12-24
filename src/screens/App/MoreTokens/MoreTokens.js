import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Animated, ActivityIndicator, RefreshControl } from 'react-native'
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
                refreshControl={
                    <RefreshControl
                        tintColor={'#fff'}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

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