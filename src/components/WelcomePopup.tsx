import React from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';

type WelcomePopupProps = {
  visible: boolean;
  onStartTour: () => void;
};

const WelcomePopup = ({visible, onStartTour}: WelcomePopupProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.centeredView}>
        <View style={styles.card}>
          <Text style={styles.heading}>
            Welcome to{'\n'}
            <Text style={{color: '#0B7557'}}>Bharat Carbon 👋</Text>
          </Text>
          <Text style={styles.subText}>
            Start your journey toward a sustainable lifestyle. Let's take a
            quick tour!
          </Text>
          <TouchableOpacity style={styles.button} onPress={onStartTour}>
            <Text style={styles.buttonText}>Start Tour</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0B7557',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default WelcomePopup;
