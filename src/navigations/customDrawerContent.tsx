import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {ProfileHeader} from '../components/profileHeader';
import {UserIcon, UsersGroupIcon} from '../images/icons';
import CustomDrawerItem from './CustomDrawerItem';

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

  return (
    <DrawerContentScrollView
      {...rest}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      alwaysBounceVertical={false}
      bounces={false}
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
      <CustomDrawerItem
        icon={<UserIcon />}
        label="My Profile"
        onPress={() => {}}
      />
      <CustomDrawerItem
        icon={<UsersGroupIcon />}
        label="Family Sharing"
        onPress={() => {
          props.navigation.navigate('MemberStackNavigator');
        }}
      />
      <CustomDrawerItem
        icon={<UserIcon />}
        label="Activities"
        onPress={() => {}}
      />
      <CustomDrawerItem
        icon={<UserIcon />}
        label="Challenge"
        onPress={() => {}}
      />
      <CustomDrawerItem
        icon={<UserIcon />}
        label="Redeem Points"
        onPress={() => {}}
      />
      <CustomDrawerItem icon={<UserIcon />} label="FAQs" onPress={() => {}} />
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
      <CustomDrawerItem icon={<UserIcon />} label="Logout" onPress={() => {}} />
      <View style={styles.gap} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 0,
  },
  contentContainerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
  gap: {
    height: 16,
  },
});

export default CustomDrawerContent;
