import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const usePressAnimation = () => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scale, {
            toValue: 0.97,
            duration: 120,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 120,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    return { scale, handlePressIn, handlePressOut };
};
