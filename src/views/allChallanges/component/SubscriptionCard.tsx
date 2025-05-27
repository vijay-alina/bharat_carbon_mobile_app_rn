// SubscriptionCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // or 'expo-linear-gradient' if using Expo
import { Colors } from '../../../constants/colors';
import CustomButton from '../../../common/button';
import AerrowIconWithTail from '../images/icons/arrow_right_with_tail.svg';

type SubscriptionCardProps = {
    price: number;
    onPress: () => void;
};

const SubscriptionCard = ({ price, onPress }: SubscriptionCardProps) => {
    return (
        <LinearGradient
            colors={[Colors.LightGreen, Colors.DarkGreen]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.card}
        >
            <Text style={styles.heading}>Get Started with the Annual Plan</Text>
            <Text style={styles.subText}>Access to the dashboard and all features requires a subscription.</Text>

            <Text style={styles.price}>₹{price} <Text style={styles.year}>/year</Text></Text>
            <Text style={styles.note}>One-time payment. No hidden fees.</Text>
            <View style={styles.divider}></View>

            <View style={styles.benefits}>
                <Text style={styles.benefit}>✓ Enter your personal dashboard</Text>
                <Text style={styles.benefit}>✓ Join all challenges</Text>
                <Text style={styles.benefit}>✓ Earn rewards & track progress</Text>
                <Text style={styles.benefit}>✓ Get personalized tips and support</Text>
            </View>


            <CustomButton
                text="Continue"
                onPress={() => console.log('Pressed')}
                backgroundColor="#4CAF50"
                textColor="#fff"
                showIcon
                iconComponent={AerrowIconWithTail}
                iconProps={{ width: 20, height: 20, fill: '#fff' }}
                isRightIcon
            />

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 22,
        marginTop: 20,
    },
    heading: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
    },
    subText: {
        fontSize: 14,
        color: '#e0f7f4',
        marginBottom: 15,
        fontFamily: 'Montserrat-Regular',
    },
    price: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        color: '#fff',
        marginBottom: 5,
    },
    year: {
        fontSize: 14,
        color: '#e0f7f4',
        fontFamily: 'Montserrat-semiBold',
    },
    note: {
        fontSize: 12,
        color: '#e0f7f4',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#fff',
        marginTop: 6,
        marginBottom: 20,
        width: '100%',
    },
    benefits: {
        marginTop: 20,
        marginBottom: 20,
    },
    benefit: {

        fontSize: 14,
        color: '#fff',
        marginBottom: 5,
        fontFamily: 'Montserrat-Regular',

    },

    submitButton: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 16,
    },

});

export default SubscriptionCard;
