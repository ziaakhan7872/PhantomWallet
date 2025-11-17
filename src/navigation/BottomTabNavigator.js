import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Activities, HistoryScreen, HomeScreen, SearchScreen, Settings, SwapMain } from '../screens/App';
import { routes } from '../constants/routes';
import { StyleSheet, TouchableOpacity, View, Image, Platform, } from 'react-native';
import { hp, wp } from '../components/ResponsiveComponent';
import { Images } from '../Images';
import { appStyles } from '../utilities/appStyles';
import { colors } from '../constants/colors';
import Spacer from '../components/Spacer';
import CardTab from '../screens/App/CardTab/CardTab';

const Tab = createBottomTabNavigator();


function BottomTabBarNav({ navigation }) {

  const [activeTab, setActiveTab] = useState()

  return (
    <View style={[styles.tabBarBackground, appStyles.row]}>

      <Tab.Navigator
        initialRouteName={routes.homeScreen}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: false,
          headerShown: false,

          tabBarStyle: {
            width: wp(100),
            backgroundColor: colors.bottomTabsBgColor,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            paddingHorizontal: wp(4),
            alignSelf: 'center',
            // borderTopWidth: 1,
            // borderTopColor: colors.black,
            marginBottom: Platform.OS == 'android' ? hp(1.5) : 0,
            paddingBottom: hp(5),
          }
        }}>

        <Tab.Screen
          name={routes.homeScreen}
          component={HomeScreen}
          options={{
            // tabBarButton: ({ focused }) => (
            //   <TouchableOpacity
            //     activeOpacity={1}
            //     onPress={() => {
            //       console.log('onPressonPressonPressonPressonPressonPressonPressonPress');
            //       setActiveTab(routes.homeScreen)
            //     }}
            //     style={{
            //       padding: wp(4),
            //       alignSelf: 'center',
            //       // borderTopWidth: focused ? 2 : 0,
            //       // borderTopColor: focused ? colors.lightPurple17 : 'transparent'
            //     }}
            //   />
            // ),
            tabBarIcon: ({ focused }) =>
              <View style={{ borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? colors.lightPurple17 : 'transparent', width: wp(18), height: wp(9), justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  source={focused ? Images.homeActiveBtn : Images.homeUnActiveBtn}
                  style={focused ? styles.activeTab : styles.unActiveTab}
                  resizeMode={'contain'}
                />
              </View>
          }}
        />

        <Tab.Screen
          name={routes.cardTab}
          component={CardTab}
          options={{
            // tabBarButton: (props) => (
            //   <TouchableOpacity
            //     {...props}
            //     activeOpacity={1}
            //     style={{
            //       padding: wp(4),
            //       alignSelf: 'center',

            //     }}
            //   />
            // ),
            tabBarIcon: ({ focused }) =>

              <View style={{ borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? colors.lightPurple17 : 'transparent', width: wp(18), height: wp(9), justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image source={focused ? Images.historyUnActiveBtn : Images.historyUnActiveBtn} tintColor={focused ? colors.lightPurple14 : colors.gray125} style={focused ? styles.activeTab : styles.unActiveTab} resizeMode="contain" />
              </View>

          }}
        />

        <Tab.Screen
          name={routes.swapMain}
          component={SwapMain}
          options={{
            // tabBarButton: (props) => (
            //   <TouchableOpacity
            //     {...props}
            //     activeOpacity={1}
            //     style={{
            //       padding: wp(4),
            //       alignSelf: 'center',
            //     }}
            //   />
            // ),
            tabBarIcon: ({ focused }) =>

              <View style={{ borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? colors.lightPurple17 : 'transparent', width: wp(18), height: wp(9), justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image source={focused ? Images.swapActiveBtn : Images.swapUnActiveBtn} style={focused ? styles.activeTab : styles.unActiveTab} resizeMode="contain" />
              </View>

          }}
        />

        <Tab.Screen
          name={routes.searchScreen}
          component={SearchScreen}
          options={{
            // tabBarButton: (props) => (
            //   <TouchableOpacity
            //     {...props}
            //     activeOpacity={1}
            //     style={{
            //       padding: wp(4),
            //       alignSelf: 'center',

            //     }}
            //   />
            // ),
            tabBarIcon: ({ focused }) =>

              <View style={{ borderTopWidth: focused ? 2 : 0, borderTopColor: focused ? colors.lightPurple17 : 'transparent', width: wp(18), height: wp(9), justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image source={focused ? Images.searchActiveBtn : Images.seacrhUnActiveBtn} style={focused ? styles.activeTab : styles.unActiveTab} resizeMode="contain" />
              </View>

          }}
        />

      </Tab.Navigator>
    </View>
  );
}

export default BottomTabBarNav;

const styles = StyleSheet.create({
  tabBarBackground: {
    width: wp(100),
    height: hp(10),
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: colors.bgColor,
    alignSelf: 'center',
    // paddingBottom: hp(3),
  },
  activeTab: {
    width: wp(5),
    height: wp(5),
    alignSelf: 'center',
    marginTop: 10
  },
  unActiveTab: {
    width: wp(5),
    height: wp(5),
    alignSelf: 'center',
    marginTop: 10
  }
});




