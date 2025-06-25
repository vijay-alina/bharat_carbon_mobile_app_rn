import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChallengeScreen} from '../views/challenge/challengeScreen';
import ChallengeList from '../views/challenge/ChallengeList';
import VegetarianChallengeScreen from '../views/allChallanges/VegetarianChallengeScreen';
import OngoingChallengeScreen from '../views/allChallanges/OngoingChallengeScreen';

const Stack = createNativeStackNavigator();

export const ChallengeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChallengeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} />
      <Stack.Screen name="ChallengeList" component={ChallengeList} />
      <Stack.Screen
        name="VegetarianChallengeScreen"
        component={VegetarianChallengeScreen}
      />
      <Stack.Screen
        name="OngoingChallengeScreen"
        component={OngoingChallengeScreen}
      />
    </Stack.Navigator>
  );
};
