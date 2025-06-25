import React, {useState, useEffect, useRef, useCallback} from 'react';
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
  ScrollView,
} from 'react-native';
import {Header} from '../../common/header';
import {Colors} from '../../constants/colors';
import CustomButton from '../../common/button';
import {getLineHeight} from '../../utils/utils';
import {RedoIcon} from '../../images/icons';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {otpGet, otpVerify} from '../../features/user/userThunks';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {useAppContext} from '../../context/AppContext';

const OTPVerificationScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const inputRefs = useRef<TextInput[]>([]);
  const email = route?.params?.email || 'user@abcschool.edu';
  const {completeOnboarding} = useAppContext();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, canResend]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setActiveInputIndex(index + 1);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
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
    setActiveInputIndex(0);

    try {
      await dispatch(otpGet(email)).unwrap();
      Alert.alert('Success', 'OTP has been resent to your email');
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  const handleVerifyOTP = async () => {
    Keyboard.dismiss();
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        otpVerify({
          email,
          otp: otpString,
        }),
      ).unwrap();
      completeOnboarding();
      // navigation.navigate('CreateProfileScreen');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
      setActiveInputIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setOtp(['', '', '', '']);
    }, []),
  );

  const headerStyle = {
    ...styles.headerContainer,
    ...(keyboardVisible && styles.headerKeyboardVisible),
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
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <Header
            hasTransparentBackground={true}
            title="OTP Verification"
            containerStyle={headerStyle}
            textStyle={{color: Colors.White}}
            onBackClick={() => navigation.goBack()}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View
              style={[
                styles.content,
                keyboardVisible && styles.contentKeyboardVisible,
              ]}>
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
                    ref={(ref: TextInput | null) => {
                      if (ref) {
                        inputRefs.current[index] = ref;
                      }
                    }}
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
                    autoFocus={index === 0}
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
                  <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
                )}
              </View>

              <CustomButton
                text={isLoading ? 'Verifying...' : 'Verify & Continue'}
                onPress={handleVerifyOTP}
                // onPress={() => {
                //   // navigation.navigate('CreateProfileScreen');
                //   completeOnboarding();
                // }}
                disabled={isLoading}
                style={styles.verifyButton}
              />
            </View>
          </ScrollView>
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
  headerContainer: {
    marginTop: 44,
  },
  headerKeyboardVisible: {
    marginTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    minHeight: 400,
  },
  contentKeyboardVisible: {
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  messageText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: Colors.White,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: getLineHeight(16, 120),
  },
  emailText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: Colors.White,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.White,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Black,
    marginHorizontal: 8,
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
    backgroundColor: Colors.ThickGreenShades800,
    color: Colors.White,
  },
  otpInputActive: {
    borderWidth: 2,
    borderColor: Colors.ThickGreenShades800,
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
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyButton: {
    marginTop: 20,
  },
  // Remove unused styles
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
  messageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Black,
  },
  keyboardModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardModalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
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
});

export default OTPVerificationScreen;
