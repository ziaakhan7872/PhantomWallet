import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MainContainer } from '../../../components/MainContainer';
import { colors } from '../../../constants/colors';
import { routes } from '../../../constants/routes';
import database, { getAllWallets } from '../../../services/database';
import { hp, wp } from '../../../components/ResponsiveComponent';
import { Images } from '../../../Images';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get all wallets from SQLite
        const wallets = await getAllWallets();

        // Wait for minimum splash time
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Check if wallets exist
        if (wallets && wallets.length > 0) {
          console.log('Existing wallets found - navigating to PIN screen');
          navigation.replace(routes.pinScreen, { splashScreen: true });
        } else {
          console.log('No wallets found - navigating to onboarding');
          navigation.replace(routes.onBoarding);
        }
      } catch (error) {
        // No wallets found, treat as new user
        console.log('Error checking wallets:', error);

        // Wait for minimum splash time
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigation.replace(routes.onBoarding);
      }
    };

    setTimeout(() => {
      checkAuthStatus();
    }, 1000);
  }, [navigation, dispatch]);

  return (
    <MainContainer>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image source={Images.onBoarding1Logo} resizeMode='contain' style={styles.splashScreensLogo} />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  splashScreensLogo: {
    width: wp(100),
    height: hp(50),
    alignSelf: 'center'
  }
});

export default SplashScreen;


