/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import 'whatwg-fetch';
import 'react-native-get-random-values';
// import { Buffer } from 'buffer';
// global.Buffer = Buffer;

// // Polyfill for process
// import process from 'process';
// global.process = process;

// Polyfill for stream (imported for side effects)
// import 'readable-stream';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
