import { FlatList, Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Spacer, { HorizontalSpacer } from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { MainContainerApp } from '../../../components/MainContainer'
import { AccountCard, BalanceCard, DiscoverView, FollowingView, HorizontalSrcoll, PrepView, RowTabs, TokensCard, TokensTabs } from './Components'
import { routes } from '../../../constants/routes'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import useHomeScreen from './Hooks'
import { appStyles } from '../../../utilities/appStyles'
import { colors } from '../../../constants/colors'


const nftList = [
    { image: Images.nft1 },
    { image: Images.nft2 },
    { image: Images.nft2 },
    { image: Images.nft2 },
    { image: Images.nft2 },
];
// const nftList = [
//     { image: "https://picsum.photos/600/600?random=1" },
//     { image: "https://picsum.photos/600/600?random=2" },
//     { image: "https://picsum.photos/600/600?random=3" },
//     { image: "https://picsum.photos/600/600?random=4" },
//     { image: "https://picsum.photos/600/600?random=5" }
// ];



const HomeScreen = (props) => {

    const {
        activeWalletWithTokens,
        totalBalance,
        discoverTitle, setDiscoverTitle,
        refreshing,
        dailyPnl,
        onRefresh
    } = useHomeScreen(props);


    const sorted = activeWalletWithTokens?.tokens?.sort((a, b) => {
        const valueA = Number(a.balance) * Number(a.currentPriceUsd);
        const valueB = Number(b.balance) * Number(b.currentPriceUsd);
        return valueB - valueA; // high → low
    });



    return (
        <MainContainerApp style={{ paddingHorizontal: wp(4) }}>
            <Spacer customHeight={hp(4)} />
            <AccountCard
                profile={Images.profile}
                logo={activeWalletWithTokens?.logo}
                accountName={activeWalletWithTokens?.username ? `@${activeWalletWithTokens?.username}` : ''}
                accountNumber={activeWalletWithTokens?.name ?? 'Account 1'}
                // accountName={'@FreshWallet'}
                // accountNumber={'Account 1'}
                rightImage1={Images.clock} rightImage2={Images.searchWhite}
                onPressRightImage1={() => props?.navigation.navigate(routes.activities)}
                onPressRightImage2={() => props?.navigation.navigate(routes.MainTabs, { screen: routes.searchScreen })}
                onPressAccount={() => props?.navigation.navigate(routes.accountDetails, { activeWalletWithTokens })}
            />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                    <Spacer customHeight={hp(1)} />
                    <BalanceCard totalBalance={totalBalance} dailyPnl={dailyPnl} />


                    <Spacer customHeight={hp(3)} />
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

                // perps
                <Spacer customHeight={hp(1.5)} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.prepMain)} style={appStyles.rowBasic}>
                    <PoppinsText style={styles.prepTitle}>Perps</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={{ width: wp(3), height: wp(3), marginLeft: wp(2) }} />
                </TouchableOpacity>
                <Spacer customHeight={hp(1.5)} />
                <PrepView />

                // tokens
                <Spacer customHeight={hp(2.5)} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={appStyles.rowBasic}>
                    <PoppinsText style={styles.prepTitle}>Tokens</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={{ width: wp(2), height: wp(3), marginLeft: wp(2) }} />
                </TouchableOpacity>
                <Spacer customHeight={hp(1.5)} />

                <TokensCard
                    tokenData={sorted ?? []}
                    onPressToken={(item) => props?.navigation.navigate(routes.tokenDetails, { tokenData: item })}
                />

                // nfts
                <Spacer customHeight={hp(2.5)} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={appStyles.rowBasic}>
                    <PoppinsText style={styles.prepTitle}>Collectibles</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={{ width: wp(2), height: wp(3), marginLeft: wp(2) }} />
                </TouchableOpacity>
                <Spacer customHeight={hp(1.5)} />
                <FlatList
                    data={nftList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <HorizontalSpacer customWidth={wp(2)} />}
                    removeClippedSubviews={false}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Image source={item?.image} resizeMode='contain' style={{ width: wp(30), height: wp(30), borderRadius: 16 }} />
                            </View>
                        )
                    }}
                />

                // discover and following
                <Spacer customHeight={hp(2)} />
                <View style={appStyles.rowBasic}>
                    <PoppinsText onPress={() => setDiscoverTitle('Discover')} style={[styles.prepTitle, { marginRight: wp(3), color: discoverTitle == 'Discover' ? colors.gray19 : '#5C5C5C' }]}>Discover</PoppinsText>
                    <PoppinsText onPress={() => setDiscoverTitle('Following')} style={[styles.prepTitle, { color: discoverTitle == 'Following' ? colors.gray19 : '#5C5C5C' }]}>Following</PoppinsText>
                </View>
                <Spacer customHeight={hp(2)} />

                {discoverTitle == 'Discover' && (
                    <DiscoverView
                        tokenData={activeWalletWithTokens?.tokens}
                        onPressToken={(item) => props?.navigation.navigate(routes.tokenDetails, { tokenData: item })}
                    />
                )}

                {discoverTitle == 'Following' && (
                    <FollowingView />
                )}

                <Spacer customHeight={hp(3)} />
                <View style={appStyles.rowBasic}>
                    <Image source={Images.infoLogo} tintColor={colors.gray10} resizeMode='contain' style={[styles.disclosures, { tintColor: colors.gray10 }]} />
                    <PoppinsText style={styles.lastText}>View disclosures</PoppinsText>
                </View>
                <Spacer customHeight={hp(2)} />

            </ScrollView>

        </MainContainerApp>
    )
}

export default HomeScreen
