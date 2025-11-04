/**
 * CoreWallet App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './shim';
import './globals';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'whatwg-fetch';

import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigation from './src/navigation/index';
import { store, persistor } from './src/redux/store';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <StatusBar barStyle={'light-content'} />
            <Navigation />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
