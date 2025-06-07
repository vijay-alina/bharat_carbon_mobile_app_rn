// SubscriptionScreen.js
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import SubscriptionCard from './component/SubscriptionCard';

import type {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '../../common/header';
import {Text} from 'react-native';
import {useAppContext} from '../../context/AppContext';

type Props = {
  navigation: StackNavigationProp<any>;
};

const SubscriptionScreen = ({navigation}: Props) => {
  const {completeOnboarding} = useAppContext();
  const handleSubscribe = () => {
    // Navigate or handle subscription logic here
    console.log('Subscribed!');
    navigation.navigate('PaymentScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Annual Plan" onBackClick={() => navigation.goBack()} />
      <View style={{marginHorizontal: 16}}>
        <SubscriptionCard price={999} onPress={handleSubscribe} />
      </View>
      <Text style={styles.note}>
        <Text style={{fontWeight: '600'}}>Note:</Text> Subscription is required
        to access the dashboard and participate in challanges
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // padding: 20,
    // paddingTop: 40,
  },
  note: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    marginHorizontal: 16,
  },
});

export default SubscriptionScreen;
