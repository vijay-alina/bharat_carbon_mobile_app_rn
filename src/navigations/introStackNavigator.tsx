import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroScreen } from '../views/intro/IntroScreen';

const Stack = createNativeStackNavigator();

export const IntroStackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="IntroScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
      </Stack.Navigator>
  );
};
