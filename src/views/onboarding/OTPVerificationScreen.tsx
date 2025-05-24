import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import {Header} from '../../common/header';
import {Colors} from '../../constants/colors';
import CustomButton from '../../common/button';
import {getLineHeight} from '../../utils/utils';
import {RedoIcon} from '../../images/icons';

const OTPVerificationScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomKeyboard, setShowCustomKeyboard] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const inputRefs = useRef([]);
  const email = route?.params?.email || 'user@abcschool.edu';

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowCustomKeyboard(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowCustomKeyboard(false);
      },
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) {
      return;
    } // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setActiveInputIndex(index + 1);
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInputIndex(index - 1);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) {
      return;
    }

    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'OTP has been resent to your email');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to main app or next screen
      navigation.reset({
        index: 0,
        routes: [{name: 'MainApp'}],
      });
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
      setActiveInputIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
        }}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <Header
            hasTransparentBackground={true}
            title="OTP Verification"
            containerStyle={{marginTop: 44}}
            textStyle={{color: Colors.White}}
          />
          <View style={styles.content}>
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                We have sent a verification code to
              </Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit !== '' && styles.otpInputFilled,
                    activeInputIndex === index && styles.otpInputActive,
                  ]}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  onFocus={() => setActiveInputIndex(index)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>
            <View style={styles.timerContainer}>
              {canResend ? (
                <TouchableOpacity onPress={handleResendOTP}>
                  <View style={styles.resendContainer}>
                    <RedoIcon />
                    <Text style={styles.resendText}>Resend OTP</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>Resend OTP in {timer}</Text>
              )}
            </View>
            <CustomButton
              text={isLoading ? 'Verifying...' : 'Verify & Continue'}
              onPress={handleVerifyOTP}
              disabled={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  otpInputFilled: {
    backgroundColor: '#4ECDC4',
    color: '#FFFFFF',
  },
  otpInputActive: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: Colors.White,
    lineHeight: getLineHeight(16, 120),
  },
  resendText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: Colors.PrimaryGreenThick,
    fontWeight: '500',
    lineHeight: getLineHeight(14, 120),
    marginLeft: 8,
  },
  keyboardModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardModalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  messageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1,
  },
  keyboardKey: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0.5,
  },
  keyboardKeyInactive: {
    backgroundColor: '#F0F0F0',
  },
  keyboardKeySpecial: {
    backgroundColor: '#D1D1D1',
  },
  keyboardKeyText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
  },
  keyboardKeyTextInactive: {
    color: '#CCCCCC',
  },
  keyboardKeySubText: {
    fontSize: 10,
    color: '#666666',
    marginTop: -4,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default OTPVerificationScreen;
