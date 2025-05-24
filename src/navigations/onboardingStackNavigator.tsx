import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../views/onboarding/WelcomeScreen';
import LoginScreen from '../views/onboarding/LoginScreen';
import OTPVerificationScreen from '../views/onboarding/OTPVerificationScreen';

const Stack = createNativeStackNavigator();

export const OnboardingStackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
      </Stack.Navigator>
  );
};
