import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabBar from './customTabBar';
import {HomeScreen} from '../views/home/homeScreen';
import {TabParamList} from './navigation.types';
import {StatsScreen} from '../views/stats/statsScreen';
import HousingDataForm from '../views/add/HousingDataForm';
import LeaderboardScreen from '../views/Leaderboard/LeaderboardScreen';
import {ChallengeStackNavigator} from './challengeStackNavigator';
import {useAppContext} from '../context/AppContext';
import FamilyLeaderboardScreen from '../views/Leaderboard/FamilyLeaderboardScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const CustomTabBarWrapper = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

export const TabNavigator = () => {
  const {user} = useAppContext();
  console.log('User:', user);
  return (
    <Tab.Navigator
      tabBar={CustomTabBarWrapper}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={ChallengeStackNavigator} />
      <Tab.Screen
        name="Add"
        component={HousingDataForm}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            //@ts-ignore
            navigation.navigate('UploadDataScreen');
          },
        })}
      />
      <Tab.Screen name="Stats" component={StatsScreen} />
      {user.type === 'student' ? (
        <Tab.Screen name="Profile" component={LeaderboardScreen} />
      ) : (
        <Tab.Screen name="Profile" component={FamilyLeaderboardScreen} />
      )}
    </Tab.Navigator>
  );
};
