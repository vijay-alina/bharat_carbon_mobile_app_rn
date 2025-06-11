import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons'; // or any icon library

const { width } = Dimensions.get('window');
// type CameraPermissionStatus =
//     | 'granted'
//     | 'denied'
//     | 'not-determined'
//     | 'restricted'
//     | 'blocked'

const CameraComponent: React.FC<CameraPermissionStatus> = () => {
    const devices = useCameraDevices();
    const device = devices.find((d) => d.position === (isFront ? 'front' : 'back'));

    const [hasPermission, setHasPermission] = useState(false);
    const [isFront, setIsFront] = useState(false);

    useEffect(() => {
        (async () => {
            const status:CameraPermissionStatus = await Camera.requestCameraPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);


    if (device == null) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />

            {/* Top Bar */}
            <View style={styles.topBar}>
                <Icon name="flash" size={24} color="#fff" />
                <Icon name="lock-closed" size={24} color="#fff" />
                <Icon name="person-circle-outline" size={24} color="#fff" />
                <Icon name="settings-outline" size={24} color="#fff" />
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomIcon}>
                    <Icon name="close" size={36} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.captureButton}>
                    <View style={styles.innerCircle} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomIcon} onPress={() => setIsFront(!isFront)}>
                    <Icon name="camera-reverse" size={36} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topBar: {
        position: 'absolute',
        top: 20,
        width: width - 40,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 40,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    bottomIcon: {
        padding: 10,
    }
});

export default CameraComponent;
