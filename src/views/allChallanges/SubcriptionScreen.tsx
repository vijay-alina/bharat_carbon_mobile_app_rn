// SubscriptionScreen.js
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import SubscriptionCard from './component/SubscriptionCard';

import type { StackNavigationProp } from '@react-navigation/stack';
import { Header } from '../../common/header';
import { Text } from 'react-native';

type Props = {
    navigation: StackNavigationProp<any>;
};

const SubscriptionScreen = ({ navigation }: Props) => {
    const handleSubscribe = () => {
        // Navigate or handle subscription logic here
        console.log('Subscribed!');
        // navigation.navigate('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Annual Plan' />
            <SubscriptionCard price={999} onPress={handleSubscribe} />
            <Text style={styles.note}> Subscription is required to access the dashboard and participate in challanges</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    note: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
    }
});

export default SubscriptionScreen;
