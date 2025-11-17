import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import PoppinsText from '../../../components/PoppinsText';
import { MainContainerApp } from '../../../components/MainContainer';
import { styles } from './styles';
import { Images } from '../../../Images';
import Spacer from '../../../components/Spacer';
import { hp, wp } from '../../../components/ResponsiveComponent';
import { routes } from '../../../constants/routes';
import { CustomButton } from '../../../components/CustomButton';
import { appStyles } from '../../../utilities/appStyles';
import useOnBoarding from './Hooks';
import { colors } from '../../../constants/colors';
import { onBoardingData } from '../../../components/dummyData';

const OnboardingScreen = (props) => {
  const { isTermsAccepted, setIsTermsAccepted, setCurrentIndex, handleScroll } = useOnBoarding();
  return (
    <MainContainerApp>
      <View style={styles.mainView}>
        <Spacer />
        <Image soure={Images.questionMark} resizeMode='contain' style={styles.questionMark} />
        <FlatList
          data={onBoardingData}
          keyExtractor={(item) => item?.id?.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1, justifyContent: item?.id == 6 ? 'top' : 'center', }}>
                <Image source={item?.logo} resizeMode='contain'
                  style={item?.id === 1 ? styles.firstOnboardingLogo :
                    item?.id === 2 ? styles.secondOnboardingLogo :
                      item?.id === 3 ? styles.thirdOnboardingLogo :
                        item?.id === 4 ? styles.fourthOnboardingLogo :
                          item?.id === 5 ? styles.fifthOnboardingLogo :
                            item?.id === 6 ? styles.sixthOnboardingLogo :
                              ''
                  }
                />
                <Spacer customHeight={hp(2)} />
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}>
                  <View style={{ alignItems: 'center', justifyContent: 'flex-end', }}>
                    <PoppinsText style={styles.welcomeText}>{item?.title}</PoppinsText>
                    <PoppinsText style={styles.startedDesc}>{item?.description}</PoppinsText>
                    <Spacer customHeight={hp(1)} />
                    <Image source={item?.sliderLogo} resizeMode='contain' style={styles.slider1} />
                  </View>
                </View>
              </View>
            )
          }}

        />
      </View>
      <Spacer />
      <View style={styles.btnView}>
        <TouchableOpacity activeOpacity={0.8} style={{ ...appStyles.rowBasic, alignSelf: 'center' }} onPress={() => setIsTermsAccepted(!isTermsAccepted)}>
          <PoppinsText style={styles.termsText}>By continuing, you agree to the{' '}
            <PoppinsText style={styles.termsText1}>Terms{' '}
              <PoppinsText style={styles.termsText}>and{' '}</PoppinsText>
              Privacy Policy.</PoppinsText>
          </PoppinsText>
        </TouchableOpacity>
        <Spacer customHeight={hp(1)} />
        <CustomButton
          title="Create a new wallet"
          onPressBtn={() => props?.navigation.navigate(routes.createWallet)}
        />
        <Spacer customHeight={hp(1)} />
        <CustomButton
          title="I already have a wallet"
          btnSyles={{ ...styles.btnSyles, backgroundColor: colors.btnDisableColor }}
          titleStyles={{ ...styles.btnTitleStyles, color: colors.white }}
          onPressBtn={() => props?.navigation.navigate(routes.createWallet, { isImportFlow: true })}
        />

      </View>
    </MainContainerApp>
  );
};

export default OnboardingScreen;


