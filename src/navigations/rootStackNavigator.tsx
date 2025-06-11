import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { IntroScreen } from '../views/intro/IntroScreen';
import { DrawerNavigator } from './drawerNavigator';
import UploadDataScreen from '../views/allChallanges/UploadDataScreen';
import ChallengeFormSelectionScreen from '../views/allChallanges/ChallengeFormSelectionScreen';
import ConsumItemList from '../views/allChallanges/component/Forms/ConsumeItemList';

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="DrawerNavigator" screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="UploadDataScreen" component={UploadDataScreen} />
        <Stack.Screen name="ChallengeFormSelectionScreen" component={ChallengeFormSelectionScreen} />
        <Stack.Screen name="ConsumItemList" component={ConsumItemList} />
      </Stack.Navigator>
  );
};
