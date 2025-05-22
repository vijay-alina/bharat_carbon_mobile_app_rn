import React from 'react';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './customTabBar';
import { HomeScreen } from '../views/home/homeScreen';
import { TabParamList } from './navigation.types';
import { ChallengeScreen } from '../views/challenge/challengeScreen';
import { AddScreen } from '../views/add/addScreen';
import { StatsScreen } from '../views/stats/statsScreen';
// import CreateProfileForm from '../views/profile/profileScreen';
// import ClimateManifesto from '../views/profile/ClimateManifesto';
import ProfileCompleted from '../views/profile/ProfileComleted';

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarWrapper = (props:BottomTabBarProps) => <CustomTabBar {...props} />;

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={CustomTabBarWrapper}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={ChallengeScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileCompleted} />
    </Tab.Navigator>
  );
};
