import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert,
  Keyboard,
} from 'react-native';
import CustomButton from '../../common/button';
import {Header} from '../../common/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/hooks';
import {
  submitMemberThunk,
  updateMemberThunk,
} from '../../features/challenge/addMember/addMemberThunk';
import {verifyOtpAddedFamily} from '../../services/userService';

const FamilyOTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<Array<TextInput | null>>([]);

  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {isEdit, member, phoneNumber, payload} =
    (route.params as {
      phoneNumber: string;
      payload: any;
      isEdit: boolean | undefined;
      member: any;
    }) || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text !== '' && index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      // Trigger resend OTP logic here
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }
    setLoading(true);
    try {
      await verifyOtpAddedFamily(phoneNumber, otpString);
      if (isEdit && member?._id) {
        await dispatch(
          updateMemberThunk({familyId: member._id, payload}),
        ).unwrap();
        Alert.alert('Member updated successfully');
      } else {
        await dispatch(submitMemberThunk(payload)).unwrap();
        Alert.alert('Member added successfully');
      }
      navigation.navigate('FamilyOverviewScreen');
    } catch (error: any) {
      console.log('error', error);
      Alert.alert('otp is expire or invalid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header
        title={'Otp Verification'}
        onBackClick={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>
            We have sent a verification code to{'\n'}
            <Text style={styles.phone}>+91 78122 45690</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  focusedIndex === index && {borderColor: 'green'},
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                returnKeyType="done"
              />
            ))}
          </View>

          <Text
            onPress={handleResend}
            style={[styles.resendText, timer === 0 && {color: '#00C897'}]}>
            {timer === 0 ? 'Resend OTP' : `Resend OTP in ${timer}`}
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            text="Verify and Continue"
            onPress={handleSubmit}
            backgroundColor="#17a086"
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FamilyOTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  phone: {
    fontWeight: '600',
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
  },
  resendText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  submitButton: {
    borderRadius: 30,
    paddingVertical: 16,
  },
});
