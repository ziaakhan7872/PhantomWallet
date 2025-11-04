import { Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import Spacer from '../../../components/Spacer'
import { hp, wp } from '../../../components/ResponsiveComponent'
import { MainContainerApp } from '../../../components/MainContainer'
import { AccountCard, BalanceCard, HorizontalSrcoll, PrepView, RowTabs, TokensCard, TokensTabs } from './Components'
import { routes } from '../../../constants/routes'
import { Images } from '../../../Images'
import PoppinsText from '../../../components/PoppinsText'
import useHomeScreen from './Hooks'
import { appStyles } from '../../../utilities/appStyles'

const HomeScreen = (props) => {

    const {
        activeWalletWithTokens
    } = useHomeScreen(props);

    return (
        <MainContainerApp style={{ paddingHorizontal: wp(4) }}>
            <Spacer customHeight={hp(7)} />
            <AccountCard
                profile={Images.profile1}
                accountName="@FreshWallet7" accountNumber={'Account 1'}
                rightImage1={Images.clock} rightImage2={Images.searchWhite}
                onPressRightImage1={() => { }}
                onPressRightImage2={() => { }}
                onPressAccount={() => props?.navigation.navigate(routes.accountDetails)}
            />

            <View>
                <Spacer customHeight={hp(1)} />
                <BalanceCard />


                <Spacer customHeight={hp(1)} />
                <RowTabs onPressTab={(item) => {
                    console.log('RowTabs item:', item);
                    if (item?.id === 1) {
                        props?.navigation.navigate(routes.receive)
                    } else if (item?.id === 2) {
                        props?.navigation.navigate(routes.sendTokens)
                    }
                    else if (item?.id === 3) {
                        props?.navigation.navigate(routes.swapMain)
                    }
                    else if (item?.id === 4) {
                        props?.navigation.navigate(routes.buyFromHome)
                    }
                }} />

                <Spacer />
                <HorizontalSrcoll onPress={(item) => { }} onPressCross={(item) => { }} />
            </View>

            <Spacer customHeight={hp(1.5)} />
            <TouchableOpacity activeOpacity={0.8} onPress={() => props?.navigation.navigate(routes.prepMain)} style={appStyles.rowBasic}>
                <PoppinsText style={styles.prepTitle}>Perps</PoppinsText>
                <Image source={Images.arrowRight} resizeMode='contain' style={{ width: wp(2), height: wp(3), marginLeft: wp(2) }} />
            </TouchableOpacity>
            <Spacer customHeight={hp(0.5)} />
            <PrepView />

            <Spacer customHeight={hp(3)} />
            <TokensTabs />

            <Spacer customHeight={hp(0.8)} />
            <TokensCard
                tokenData={activeWalletWithTokens?.tokens}
                onPressToken={(item) => props?.navigation.navigate(routes.tokenDetails, { tokenData: item })}
            />

        </MainContainerApp>
    )
}

export default HomeScreen
