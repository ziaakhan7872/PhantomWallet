import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState, useCallback } from 'react';
import { styles } from './styles';
import Spacer, { HorizontalSpacer } from '../../../components/Spacer';
import { hp, wp } from '../../../components/ResponsiveComponent';
import { MainContainerApp } from '../../../components/MainContainer';
import {
  AccountCard,
  BalanceCard,
  DiscoverView,
  FollowingView,
  HorizontalSrcoll,
  PrepView,
  RowTabs,
  TokensCard,
  TokensTabs,
} from './Components';
import { routes } from '../../../constants/routes';
import { Images } from '../../../Images';
import PoppinsText from '../../../components/PoppinsText';
import useHomeScreen from './Hooks';
import { appStyles } from '../../../utilities/appStyles';
import { colors } from '../../../constants/colors';

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

const HomeScreen = props => {
  const {
    activeWalletWithTokens,
    totalBalance,
    discoverTitle,
    setDiscoverTitle,
    refreshing,
    dailyPnl,
    onRefresh,
    isSkeltonLoading,
    setIsSkeltonLoading,
  } = useHomeScreen(props);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [pullDistance, setPullDistance] = useState(0);
  const pullDistanceRef = useRef(0);
  const REFRESH_THRESHOLD = 80;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < 0) {
          const distance = Math.abs(offsetY);
          setPullDistance(distance);
          pullDistanceRef.current = distance;
        } else {
          setPullDistance(0);
          pullDistanceRef.current = 0;
        }
      },
    },
  );

  const handleScrollEndDrag = useCallback(() => {
    if (pullDistanceRef.current >= REFRESH_THRESHOLD && !refreshing) {
      onRefresh();
    }
    setPullDistance(0);
    pullDistanceRef.current = 0;
  }, [refreshing, onRefresh]);

  const sorted = activeWalletWithTokens?.tokens?.sort((a, b) => {
    const valueA = Number(a.balance) * Number(a.currentPriceUsd);
    const valueB = Number(b.balance) * Number(b.currentPriceUsd);
    return valueB - valueA; // high → low
  });

  return (
    <MainContainerApp style={{ paddingHorizontal: wp(4) }}>
      <Spacer customHeight={Platform.OS === 'ios' ? hp(7) : hp(4)} />
      <AccountCard
        profile={Images.profile}
        logo={activeWalletWithTokens?.logo}
        accountName={
          activeWalletWithTokens?.username
            ? `@${activeWalletWithTokens?.username}`
            : ''
        }
        accountNumber={activeWalletWithTokens?.name ?? 'Account 1'}
        // accountName={'@FreshWallet'}
        // accountNumber={'Account 1'}
        rightImage1={Images.clock}
        rightImage2={Images.searchWhite}
        onPressRightImage1={() => props?.navigation.navigate(routes.activities)}
        onPressRightImage2={() =>
          props?.navigation.navigate(routes.MainTabs, {
            screen: routes.searchScreen,
          })
        }
        onPressAccount={() =>
          props?.navigation.navigate(routes.accountDetails, {
            activeWalletWithTokens,
          })
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEndDrag}
        bounces={true}
        overScrollMode="always"
      >
        {/* Custom pull-to-refresh indicator with more height */}
        {(pullDistance > 0 || refreshing) && (
          <View
            style={{
              height: refreshing ? hp(20) : Math.min(pullDistance * 1.5, hp(25)),
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <ActivityIndicator
              size="large"
              color={colors.gray6}
              animating={pullDistance >= REFRESH_THRESHOLD || refreshing}
              style={{
                transform: [{ scale: 0.9 }],
              }}
            />
          </View>
        )}
        <View>
          <Spacer customHeight={hp(1)} />
          <BalanceCard totalBalance={totalBalance} dailyPnl={dailyPnl} />

          <Spacer customHeight={hp(3)} />
          <RowTabs
            onPressTab={item => {
              console.log('RowTabs item:', item);
              if (item?.id === 1) {
                props?.navigation.navigate(routes.receive, {
                  activeWalletWithTokens,
                });
              } else if (item?.id === 2) {
                props?.navigation.navigate(routes.sendTokens, {
                  activeWalletWithTokens,
                });
              } else if (item?.id === 3) {
                props?.navigation.navigate(routes.swapMain);
              } else if (item?.id === 4) {
                props?.navigation.navigate(routes.buyFromHome);
              }
            }}
          />

          {/* <Spacer customHeight={hp(2.5)} />
                    <HorizontalSrcoll onPress={(item) => { }} onPressCross={(item) => { }} /> */}
        </View>

        <Spacer customHeight={hp(2.5)} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props?.navigation.navigate(routes.moreTokens)}
          style={appStyles.rowBasic}
        >
          <PoppinsText style={styles.prepTitle}>Tokens</PoppinsText>
          <Image
            source={Images.arrowRight}
            resizeMode="contain"
            style={{ width: wp(2), height: wp(4), marginLeft: wp(2) }}
          />
        </TouchableOpacity>
        <Spacer customHeight={hp(1)} />

        <TokensCard
          tokenData={sorted?.slice(0, 3) ?? []}
          isSkeltonLoading={isSkeltonLoading}
          onPressToken={item =>
            props?.navigation.navigate(routes.tokenDetails, { tokenData: item })
          }
        />

        <Spacer customHeight={hp(2)} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props?.navigation.navigate(routes.prepMain)}
          style={appStyles.rowBasic}
        >
          <PoppinsText style={styles.prepTitle}>Perps</PoppinsText>
          <Image
            source={Images.arrowRight}
            resizeMode="contain"
            style={{ width: wp(2), height: wp(4), marginLeft: wp(2) }}
          />
        </TouchableOpacity>
        <Spacer customHeight={hp(1)} />
        <PrepView />

        {/* // nfts
                <Spacer customHeight={hp(2.5)} />
                <TouchableOpacity activeOpacity={0.8} onPress={() => { }} style={appStyles.rowBasic}>
                    <PoppinsText style={styles.prepTitle}>Collectibles</PoppinsText>
                    <Image source={Images.arrowRight} resizeMode='contain' style={{ width: wp(2), height: wp(4), marginLeft: wp(2) }} />
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
                /> */}

        {/* // discover and following
                <Spacer customHeight={hp(2)} />
                <View style={appStyles.rowBasic}>
                    <PoppinsText onPress={() => setDiscoverTitle('Discover')} style={[styles.prepTitle, { marginRight: wp(3), color: discoverTitle == 'Discover' ? colors.white : '#5C5C5C' }]}>Discover</PoppinsText>
                    <PoppinsText onPress={() => setDiscoverTitle('Following')} style={[styles.prepTitle, { color: discoverTitle == 'Following' ? colors.white : '#5C5C5C' }]}>Following</PoppinsText>
                </View>
                <Spacer customHeight={hp(1)} />

                {discoverTitle == 'Discover' && (
                    <DiscoverView
                        tokenData={activeWalletWithTokens?.tokens}
                        onPressToken={(item) => props?.navigation.navigate(routes.tokenDetails, { tokenData: item })}
                    />
                )}

                {discoverTitle == 'Following' && (
                    <FollowingView
                        tokenData={activeWalletWithTokens?.tokens}
                        onPressToken={(item) => props?.navigation.navigate(routes.tokenDetails, { tokenData: item })}
                    />
                    // <FollowingView />
                )} */}

        <Spacer customHeight={hp(3)} />
        <View style={appStyles.rowBasic}>
          <Image
            source={Images.infoLogo}
            tintColor={colors.gray10}
            resizeMode="contain"
            style={[styles.disclosures, { tintColor: colors.gray10 }]}
          />
          <PoppinsText style={styles.lastText}>View disclosures</PoppinsText>
        </View>
        <Spacer customHeight={hp(2)} />
      </ScrollView>
    </MainContainerApp>
  );
};

export default HomeScreen;
