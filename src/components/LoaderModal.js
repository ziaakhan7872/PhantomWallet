import React, { useRef, useEffect } from 'react';
import {
    View,
    Modal,
    Animated,
    ActivityIndicator,
    Easing,
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';
import { colors } from '../constants/colors';
import { hp } from './ResponsiveComponent';

const { width, height } = Dimensions.get('window');

const LoaderModal = ({ visible }) => {
    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 13000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        } else {
            animationProgress.current.setValue(0);
        }
    }, [visible]);

    return (
        <Modal
            transparent
            animationType="none"
            visible={visible}
            statusBarTranslucent
        >
            <View style={styles.absoluteFill}>
                <View style={styles.container}>
                    <View style={styles.modalBackground}>
                        <View style={styles.lottieLoadingWrapper}>
                            <ActivityIndicator size="large" color={colors.white} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        zIndex: 9999,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modalBackground: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 60,
    },
    lottieLoadingWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    lottieLoading: {
        width: 50,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoaderModal;
