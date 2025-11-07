



import React, { useRef, useEffect, useState } from 'react';
import { BackHandler, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { hp, wp } from './ResponsiveComponent';
import { Images } from '../Images';
import { SafeAreaView } from 'react-native-safe-area-context';

const QrScanner = ({ onSuccess, onPress }) => {
    const camera = useRef();
    let device = useCameraDevice("back");
    const { colors } = useTheme()
    const isFocused = useIsFocused();
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);

    const { hasPermission, requestPermission } = useCameraPermission();


    console.log('hasPermissionhasPermissionhasPermission', hasPermission);


    const requestCameraPermission = async () => {
        try {
            let permission;
            if (Platform.OS === 'ios') {
                permission = PERMISSIONS.IOS.CAMERA;
            } else {
                permission = PERMISSIONS.ANDROID.CAMERA;
            }

            const status = await request(permission);
            console.log('Camera permission status:', status);

            if (status === 'granted') {
                console.log('Camera permission granted');
                setCameraPermissionGranted(true);
                // Permission granted, you can proceed with using the camera
            } else {
                console.log('Camera permission denied');
                // Handle case when permission is denied
            }
        } catch (error) {
            console.log('Error requesting camera permission:', error);
        }
    };

    useEffect(() => {
        const backAction = () => {
            return false; // Prevent default behavior
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    useEffect(() => {
        requestCameraPermission()
    }, [hasPermission, isFocused]);


    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes, frame) => {
            let value = codes[0]?.value
            onSuccess(value);
        },
    });




    return (
        <View style={styles.container}>

            <SafeAreaView style={StyleSheet.absoluteFill}>

                {cameraPermissionGranted && device &&
                    <Camera
                        style={styles.absoluteFill}
                        ref={camera}
                        photo={true}
                        isActive={true}
                        device={device}
                        codeScanner={codeScanner}

                    />
                }

            </SafeAreaView>
            <TouchableOpacity
                style={{ width: wp(8), position: "absolute", height: wp(8), top: hp(1), left: wp(2) }}
                onPress={onPress}>
                <Image
                    source={Images.goBackArrow}
                    style={{ width: wp(5), position: "absolute", height: wp(5), top: 0, right: 0 }}

                />
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    absoluteFill: {
        flex: 1,
        width: wp(100),
        height: hp(55),

    },
});

export default QrScanner;