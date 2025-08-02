import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FamilyOverviewScreen from '../views/addMember/FamilyOverviewScreen';
import AddNewMemberScreen from '../views/addMember/AddNewMember';
import FamilyOTPVerificationScreen from '../views/addMember/FamilyOtpVerification';
import MemberProfileScreen from '../views/profile/MemberProfileScreen';

const Stack = createNativeStackNavigator();

export const MemberStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="FamilyOverviewScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="FamilyOverviewScreen"
        component={FamilyOverviewScreen}
      />
      <Stack.Screen name="AddNewMemberScreen" component={AddNewMemberScreen} />
      <Stack.Screen
        name="MemberProfileScreen"
        component={MemberProfileScreen}
      />
      <Stack.Screen
        name="FamilyOTPVerificationScreen"
        component={FamilyOTPVerificationScreen}
      />
    </Stack.Navigator>
  );
};
