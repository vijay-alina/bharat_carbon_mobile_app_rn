import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import CustomButton from '../../common/button';

const OTPVerificationScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const inputs = useRef<TextInput[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text) || text === '') {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (text !== '' && index < 3) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            setTimer(30);
            // Trigger resend OTP logic here
        }
    };

    const handleSubmit = () => {
        const fullOtp = otp.join('');
        console.log('Verifying OTP:', fullOtp);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
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
                                style={styles.otpInput}
                                keyboardType="numeric"
                                maxLength={1}
                                ref={(el) => (inputs.current[index] = el!)}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                returnKeyType="done"
                            />
                        ))}
                    </View>

                    <Text
                        onPress={handleResend}
                        style={[styles.resendText, timer === 0 && { color: '#00C897' }]}
                    >
                        {timer === 0 ? 'Resend OTP' : `Resend OTP in ${timer}`}
                    </Text>
                </ScrollView>

                <View style={styles.footer}>
                    <CustomButton
                        text="Verify and Continue"
                        onPress={handleSubmit}
                        iconName="arrow-forward"
                        backgroundColor="#17a086"
                        style={styles.submitButton}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        // marginBottom: 30,
    },
    submitButton: {
        borderRadius: 30,
        paddingVertical: 16,
    },
});
