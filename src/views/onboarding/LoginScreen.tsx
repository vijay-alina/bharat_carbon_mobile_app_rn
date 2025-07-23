import React, {useState, useEffect, useCallback, use} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import bharatCarbonImageWhite from '../../images/icons/bharat_carbon_image_white.png';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomButton from '../../common/button';
import {useAppDispatch} from '../../hooks/hooks';
import {otpGet, otpGetFamily} from '../../features/user/userThunks';
// const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const dispatch = useAppDispatch();

  const {type} = route.params as {type: string};

  console.log('type', type);

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
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSendOTP = async () => {
    Keyboard.dismiss();

    if (type === 'student') {
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter your email address');
        return;
      }

      if (!validateEmail(email.trim())) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }
    } else {
      if (!mobileNumber.trim()) {
        Alert.alert('Error', 'Please enter your mobile number');
        return;
      }
      const isValid = /^[6-9]\d{9}$/.test(mobileNumber.trim());

      if (mobileNumber.trim().length !== 10 || !isValid) {
        Alert.alert('Error', 'Please enter a valid mobile number');
        return;
      }
    }

    setIsLoading(true);

    try {
      const response =
        type === 'student' && (await dispatch(otpGet(email.trim())).unwrap());
      // : await dispatch(otpGetFamily(mobileNumber.trim())).unwrap();

      console.log('response', response);

      //@ts-ignore
      navigation.navigate('OTPVerificationScreen', {
        email: type === 'student' ? email.trim() : mobileNumber.trim(),
        type,
      });
    } catch (error: any) {
      console.error('Error sending OTP: login ', error);
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
    }, []),
  );

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
          {/* <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View
              style={[
                styles.logoSection,
                isKeyboardVisible && styles.logoSectionCompact,
              ]}>
              <Image source={bharatCarbonImageWhite} style={styles.image} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.title}>Log In with Email</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#8A8A8A"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                    autoCompleteType="email"
                  textContentType="emailAddress"
                />
              </View>
               
            </View>
           
          </ScrollView> */}

          <View style={styles.middleSection}>
            <View
            // style={[
            //   styles.logoSection,
            //   isKeyboardVisible && styles.logoSectionCompact,
            // ]}
            >
              <Image source={bharatCarbonImageWhite} style={styles.image} />
              <View style={styles.formSection}>
                <Text style={styles.title}>
                  {type === 'student'
                    ? 'Log In with Email'
                    : 'Log In with Phone Number'}
                </Text>

                {type === 'student' ? (
                  <View>
                    <TextInput
                      style={styles.emailInput}
                      placeholder="Enter your email"
                      placeholderTextColor="#8A8A8A"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      // autoCompleteType="email"
                      textContentType="emailAddress"
                    />
                  </View>
                ) : (
                  <View>
                    <TextInput
                      style={styles.emailInput}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#8A8A8A"
                      value={mobileNumber}
                      maxLength={10}
                      onChangeText={setMobileNumber}
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      autoCorrect={false}
                      // autoCompleteType="email"
                      // textContentType="phoneNumber"
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              text={isLoading ? 'Sending...' : 'Send OTP'}
              onPress={handleSendOTP}
              // onPress={() => {
              //   //@ts-ignore
              //   navigation.navigate('OTPVerificationScreen', {email: email.trim()});
              // }}
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
  scrollViewContent: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'flex-start',
    marginBottom: 'auto',
  },
  logoSectionCompact: {
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 12,
  },
  dotGrid: {
    width: 50,
    height: 50,
  },
  dotRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 2,
  },
  logoText: {
    alignItems: 'flex-start',
  },
  bharatText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  carbonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginTop: -4,
  },
  formSection: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'left',
  },
  // inputContainer: {
  //   marginBottom: 30,
  // },
  emailInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
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
  sendOTPButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  sendOTPButtonDisabled: {
    backgroundColor: '#A0D8D3',
  },
  sendOTPButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  image: {
    width: 170,
    height: 70,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  middleSection: {
    flex: 0.8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default LoginScreen;
