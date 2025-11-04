const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

const {
    resolver: { sourceExts, assetExts },
} = defaultConfig;

// Import the Node.js polyfills
const extraNodeModules = {
    ...require('node-libs-browser'), // Provides browser-compatible Node.js modules
    stream: require.resolve('stream-browserify'), // Stream polyfill for React Native
    crypto: require.resolve('crypto-browserify'), // Crypto polyfill
    buffer: require.resolve('buffer'), // Buffer polyfill
    process: require.resolve('process'), // Process polyfill
    util: require.resolve('util'), // Util polyfill
    http: require.resolve('stream-http'), // HTTP polyfill
    https: require.resolve('https-browserify'), // HTTPS polyfill
    os: require.resolve('os-browserify/browser'), // OS polyfill
    vm: require.resolve('vm-browserify'), // VM polyfill
};

const config = {
    resolver: {
        extraNodeModules,
        assetExts: assetExts.filter(ext => ext !== 'svg'), // Exclude SVG from asset extensions
        sourceExts: [...sourceExts, 'svg', 'cjs'], // Add SVG to source extensions
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};

module.exports = mergeConfig(defaultConfig, config);
