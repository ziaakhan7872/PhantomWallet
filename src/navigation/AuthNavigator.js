import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BiometricPopup, CongratulationScreen, ImportWalletScreen, OnboardingScreen, FaceIdEnable, PinScreen, PinVerificationScreen, SeedPhrase, SplashScreen, ConfirmSeedPhrase, CreateWallet, ProtectWallet, ImportAccounts, ImportPrivateKey, CreateUserName } from '../screens/Auth';
import { routes } from '../constants/routes';
import { colors } from '../constants/colors';
import { ConnectHardware } from '../screens/App';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.splashScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.bgColor },
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >

      <Stack.Screen name={routes.splashScreen} component={SplashScreen} />
      <Stack.Screen name={routes.onBoarding} component={OnboardingScreen} />
      {/* <Stack.Screen name={routes.pinVerificationScreen} component={PinVerificationScreen} /> */}
      <Stack.Screen name={routes.importWallet} component={ImportWalletScreen} />
      <Stack.Screen name={routes.biometricPopup} component={BiometricPopup} />
      <Stack.Screen name={routes.congratulationScreen} component={CongratulationScreen} />
      <Stack.Screen name={routes.seedPhrase} component={SeedPhrase} />
      <Stack.Screen name={routes.confirmSeedPhrase} component={ConfirmSeedPhrase} />
      <Stack.Screen name={routes.faceIdEnable} component={FaceIdEnable} />

      {/* New */}
      <Stack.Screen name={routes.createWallet} component={CreateWallet} />
      <Stack.Screen name={routes.pinScreen} component={PinScreen} />
      <Stack.Screen name={routes.protectWallet} component={ProtectWallet} />
      <Stack.Screen name={routes.importAccounts} component={ImportAccounts} />
      <Stack.Screen name={routes.importPrivateKey} component={ImportPrivateKey} />
      <Stack.Screen name={routes.createUserName} component={CreateUserName} />
      <Stack.Screen name={routes.connectHardware} component={ConnectHardware} />



    </Stack.Navigator>
  );
};

export default AuthNavigator;
