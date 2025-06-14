import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateProfileScreen from '../views/profile/CreateProfileScreen';
import ClimateManifestoScreen from '../views/profile/ClimateManifestoScreen';
import ProfileCompletedScreen from '../views/profile/ProfileComletedScreen';

const Stack = createNativeStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CreateProfileScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
      />
      <Stack.Screen
        name="ClimateManifestoScreen"
        component={ClimateManifestoScreen}
      />
      <Stack.Screen
        name="ProfileCompletedScreen"
        component={ProfileCompletedScreen}
      />
    </Stack.Navigator>
  );
};
