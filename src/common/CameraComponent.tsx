import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Camera, CameraPermissionStatus, useCameraDevices, PhotoFile } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraIcon from '../images/icons/Calendar_Days.svg'

const { width } = Dimensions.get('window');

const CameraComponent: React.FC = () => {
    const devices = useCameraDevices();
    const device = devices.find((d) => d.position === (isFront ? 'front' : 'back'));
    const camera = useRef<Camera>(null);

    const [hasPermission, setHasPermission] = useState(false);
    const [isFront, setIsFront] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        (async () => {
            const status: CameraPermissionStatus = await Camera.requestCameraPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (camera.current) {
            try {
                const photo: PhotoFile = await camera.current.takePhoto({
                    flash: flash,
                });
                console.log('Photo taken:', photo);
                // Handle the photo (save to gallery, etc.)
            } catch (error) {
                console.error('Failed to take photo:', error);
            }
        }
    };

    const toggleFlash = () => {
        setFlash(flash === 'off' ? 'on' : 'off');
    };

    const toggleCamera = () => {
        setIsFront(!isFront);
    };

    const toggleRecording = async () => {
        if (isRecording) {
            // Stop recording
            setIsRecording(false);
            // Add your stop recording logic here
        } else {
            // Start recording
            setIsRecording(true);
            // Add your start recording logic here
        }
    };

    if (!hasPermission) {
        return <View style={styles.permissionContainer}><Text>Camera permission required</Text></View>;
    }

    if (device == null) {
        return <View style={styles.loadingContainer}><Text>Loading camera...</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                video={true}
                audio={true}
                torch={flash}
            />

            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={toggleFlash}>
                    <Icon 
                        name={flash === 'on' ? 'flash' : 'flash-off'} 
                        size={24} 
                        color="#fff" 
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="timer-outline" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="person-circle-outline" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="settings-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomIcon}>
                    <Icon name="close" size={36} color="#fff" />
                </TouchableOpacity>

                <View style={styles.centerButtons}>
                    <TouchableOpacity 
                        style={styles.captureButton}
                        onPress={takePhoto}
                        onLongPress={toggleRecording}
                        delayLongPress={300}
                    >
                        <View style={[
                            styles.innerCircle,
                            isRecording && styles.recordingIndicator
                        ]} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.bottomIcon} 
                    onPress={toggleCamera}
                >
                    
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
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    centerButtons: {
        flex: 1,
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
    recordingIndicator: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: 40,
        height: 40,
    },
    bottomIcon: {
        padding: 10,
    }
});

export default CameraComponent;