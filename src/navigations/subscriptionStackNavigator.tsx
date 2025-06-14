import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from '../views/allChallanges/PaymentScreen';
import SubscriptionScreen from '../views/allChallanges/SubcriptionScreen';

const Stack = createNativeStackNavigator();

export const SubscriptionStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SubscriptionScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};
