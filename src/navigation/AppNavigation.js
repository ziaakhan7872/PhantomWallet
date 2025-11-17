import React from 'react'
import { routes } from '../constants/routes';
import {
    HistoryDetails, RewardInfo, Security, TermsAndServices, DeleteAccount, WalletConnect, Notifications, ImportTokens,
    Receive, TokenAddress, SendTokens, SendTokenAddress, SendTokensAmount, SendConfirmation, TokenDetails,
    AccountDetails, EditProfile, ManageProfile, EditUserName, FollowersScreen, PrivacyScreen,
    Activities,
    ActivitiesDetails,
    BuyFromHome,
    BuyTokenAmount,
    ScanQrCode,
    EnterSendingAmount,
    SendSummaryScreen,
    SendSuccess,
    PrepMain,
    AddFunds,
    MasterPerpetualFuture,
    GoLong,
    GoShort,
    AdjustingLeverage,
    Liquidation,
    RiskTolerance,
    AllSearchTokenList,
    AddAccounts,
    CreateAccount,
    WatchAddress,
    ConnectHardware,
    EditAccount,
    AccountName,
    ReceiveAccountAddress,
    ShowSeedPhrase,
    ShowPrivateKey,
    CopyPrivateKey,
    SelectAvatar,
    BuyMain,
    TokenDetailSettings,
    Slippage,
    PriorityFee,
    TipScreen,
    YouPay,
    StakeTokensEarnAwards,
    EnterStakeSolAmount,
    SendConfirmationScreen,
    SwapMain,
    AccountSettings,
    Preferences,
    PreferedExplorer,
    AppIcon,
    PreferedBitcoinAddress,
    MotionLevel,
    AddressBook,
    ConnectedApps,
    DeveloperSettings,
    AboutPhantom,
    DisplayLanguages,
    Currencies,
    SecurityAndPrivacy,
    ResetPin,
    RequireAuthentication,
    BlockedAccounts,
    DownloadAppLogs,
    DeleteWallet,
    ActiveNetworks,
} from '../screens/App';
import BottomTabBarNav from './BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateWallet, ImportPrivateKey, PinScreen, SeedPhrase } from '../screens/Auth';
import ResetApp from '../screens/App/ResetApp/ResetApp';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={routes.MainTabs}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={routes.MainTabs} component={BottomTabBarNav} />
            <Stack.Screen name={routes.historyDetails} component={HistoryDetails} />
            <Stack.Screen name={routes.rewardInfoScreen} component={RewardInfo} />
            <Stack.Screen name={routes.security} component={Security} />
            <Stack.Screen name={routes.termsOfService} component={TermsAndServices} />
            <Stack.Screen name={routes.deleteAccount} component={DeleteAccount} />
            <Stack.Screen name={routes.walletConnect} component={WalletConnect} />
            <Stack.Screen name={routes.pinScreen} component={PinScreen} />
            <Stack.Screen name={routes.notifications} component={Notifications} />
            <Stack.Screen name={routes.importTokens} component={ImportTokens} />
            <Stack.Screen name={routes.receive} component={Receive} />
            <Stack.Screen name={routes.tokenAddress} component={TokenAddress} />
            <Stack.Screen name={routes.sendTokens} component={SendTokens} />
            <Stack.Screen name={routes.sendTokensAddress} component={SendTokenAddress} />
            <Stack.Screen name={routes.sendTokensAmont} component={SendTokensAmount} />
            <Stack.Screen name={routes.sendConfirmation} component={SendConfirmation} />
            <Stack.Screen name={routes.tokenDetails} component={TokenDetails} />

            {/* // New */}
            <Stack.Screen name={routes.createWallet} component={CreateWallet} />
            <Stack.Screen name={routes.accountDetails} component={AccountDetails} />
            <Stack.Screen name={routes.editProfile} component={EditProfile} />
            <Stack.Screen name={routes.manageProfile} component={ManageProfile} />
            <Stack.Screen name={routes.editUserName} component={EditUserName} />
            <Stack.Screen name={routes.followersScreen} component={FollowersScreen} />
            <Stack.Screen name={routes.privacyScreen} component={PrivacyScreen} />
            <Stack.Screen name={routes.activities} component={Activities} />
            <Stack.Screen name={routes.activitiesDetails} component={ActivitiesDetails} />
            <Stack.Screen name={routes.buyFromHome} component={BuyFromHome} />
            <Stack.Screen name={routes.buyTokenAmount} component={BuyTokenAmount} />
            <Stack.Screen name={routes.scanQrCode} component={ScanQrCode} />
            <Stack.Screen name={routes.enterSendingAmount} component={EnterSendingAmount} />
            <Stack.Screen name={routes.sendSummaryScreen} component={SendSummaryScreen} />
            <Stack.Screen name={routes.sendSuccess} component={SendSuccess} />
            <Stack.Screen name={routes.prepMain} component={PrepMain} />
            <Stack.Screen name={routes.addFunds} component={AddFunds} />
            <Stack.Screen name={routes.masterPerpetualFuture} component={MasterPerpetualFuture} />
            <Stack.Screen name={routes.goLong} component={GoLong} />
            <Stack.Screen name={routes.goShort} component={GoShort} />
            <Stack.Screen name={routes.adjustingLeverage} component={AdjustingLeverage} />
            <Stack.Screen name={routes.liquidation} component={Liquidation} />
            <Stack.Screen name={routes.riskTolerance} component={RiskTolerance} />
            <Stack.Screen name={routes.allSearchTokenList} component={AllSearchTokenList} />
            <Stack.Screen name={routes.addAccounts} component={AddAccounts} />
            <Stack.Screen name={routes.createAccount} component={CreateAccount} />
            <Stack.Screen name={routes.seedPhrase} component={SeedPhrase} />
            <Stack.Screen name={routes.importPrivateKey} component={ImportPrivateKey} />
            <Stack.Screen name={routes.watchAddress} component={WatchAddress} />
            <Stack.Screen name={routes.connectHardware} component={ConnectHardware} />
            <Stack.Screen name={routes.editAccount} component={EditAccount} />
            <Stack.Screen name={routes.accountName} component={AccountName} />
            <Stack.Screen name={routes.receiveAccountAddress} component={ReceiveAccountAddress} />
            <Stack.Screen name={routes.showSeedPhrase} component={ShowSeedPhrase} />
            <Stack.Screen name={routes.showPrivateKey} component={ShowPrivateKey} />
            <Stack.Screen name={routes.copyPrivateKey} component={CopyPrivateKey} />
            <Stack.Screen name={routes.selectAvatar} component={SelectAvatar} />
            <Stack.Screen name={routes.buyMain} component={BuyMain} />
            <Stack.Screen name={routes.tokenDetailSettings} component={TokenDetailSettings} />
            <Stack.Screen name={routes.slippage} component={Slippage} />
            <Stack.Screen name={routes.priorityFee} component={PriorityFee} />
            <Stack.Screen name={routes.tipScreen} component={TipScreen} />
            <Stack.Screen name={routes.youPay} component={YouPay} />
            <Stack.Screen name={routes.stakeTokensEarnAwards} component={StakeTokensEarnAwards} />
            <Stack.Screen name={routes.enterStakeSolAmount} component={EnterStakeSolAmount} />
            <Stack.Screen name={routes.sendConfirmationScreen} component={SendConfirmationScreen} />
            <Stack.Screen name={routes.swapMain} component={SwapMain} />
            <Stack.Screen name={routes.accountSettings} component={AccountSettings} />
            <Stack.Screen name={routes.preferences} component={Preferences} />
            <Stack.Screen name={routes.preferedExplorer} component={PreferedExplorer} />
            <Stack.Screen name={routes.appIcon} component={AppIcon} />
            <Stack.Screen name={routes.preferedBitcoinAddress} component={PreferedBitcoinAddress} />
            <Stack.Screen name={routes.motionLevel} component={MotionLevel} />
            <Stack.Screen name={routes.addressBook} component={AddressBook} />
            <Stack.Screen name={routes.connectedApps} component={ConnectedApps} />
            <Stack.Screen name={routes.developerSettings} component={DeveloperSettings} />
            <Stack.Screen name={routes.aboutPhantom} component={AboutPhantom} />
            <Stack.Screen name={routes.displayLanguages} component={DisplayLanguages} />
            <Stack.Screen name={routes.currencies} component={Currencies} />
            <Stack.Screen name={routes.securityAndPrivacy} component={SecurityAndPrivacy} />
            <Stack.Screen name={routes.resetPin} component={ResetPin} />
            <Stack.Screen name={routes.requireAuthentication} component={RequireAuthentication} />
            <Stack.Screen name={routes.blockedAccounts} component={BlockedAccounts} />
            <Stack.Screen name={routes.downloadAppLogs} component={DownloadAppLogs} />
            <Stack.Screen name={routes.deleteWallet} component={DeleteWallet} />
            <Stack.Screen name={routes.resetApp} component={ResetApp} />
            <Stack.Screen name={routes.activeNetworks} component={ActiveNetworks} />
        </Stack.Navigator>
    );
}

export default AppNavigator
