import React from 'react';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import {
  DrawerContentComponentProps, 
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {ProfileHeader} from '../components/profileHeader';
import {UserIcon, UsersGroupIcon} from '../images/icons';
import CustomDrawerItem from './CustomDrawerItem';
import {setAccessToken} from '../utils/auth';
import {CommonActions} from '@react-navigation/native';
import {useAppContext} from '../context/AppContext';

type ProfileProps = {
  name: string;
  points: number;
  pointsToNextLevel: number;
  level: number;
  classRank: number;
  schoolRank: number;
};

export const CustomDrawerContent = (
  props: DrawerContentComponentProps & ProfileProps,
) => {
  const {
    name,
    points,
    pointsToNextLevel,
    level,
    classRank,
    schoolRank,
    ...rest
  } = props;

  const {handleLogout} = useAppContext();
  const logout = () => {
    try {
      console.log('logout');
      handleLogout();
      Alert.alert('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView
        {...rest}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
        <ProfileHeader
          name={name}
          points={points}
          pointsToNextLevel={pointsToNextLevel}
          level={level}
          classRank={classRank}
          schoolRank={schoolRank}
          onBackPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
        <View style={styles.itemsContainer}>
          <CustomDrawerItem
            icon={<UserIcon />}
            label="My Profile"
            onPress={() => {
              props.navigation.navigate('MyProfile');
            }}
          />
          <CustomDrawerItem
            icon={<UsersGroupIcon />}
            label="Family Sharing"
            onPress={() => {
              props.navigation.navigate('MemberStackNavigator');
            }}
          />
          <CustomDrawerItem
            icon={<UsersGroupIcon />}
            label="FAQs"
            onPress={() => {
              props.navigation.navigate('FAQs');
            }}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Activities"
            onPress={() => {
              props.navigation.navigate('Activities');
            }}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Challenge"
            onPress={() => {}}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Redeem Points"
            onPress={() => {
              props.navigation.navigate('RedeemPoints');
            }}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Notification"
            onPress={() => {}}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Settings"
            onPress={() => {}}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Help Center"
            onPress={() => {}}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Logout"
            onPress={logout}
          />
        </View>
        <View style={styles.gap} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  itemsContainer: {
    paddingVertical: 10,
  },
  gap: {
    height: 16,
  },
});

export default CustomDrawerContent;
