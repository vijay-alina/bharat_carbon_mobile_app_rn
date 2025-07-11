import React from 'react';
import {Alert, StatusBar, Text, StyleSheet, View, Image} from 'react-native';
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
import {
  ClassRankIcon,
  EarnedPointsIcon,
  LevelBadgeIcon,
  SchoolRankIcon,
} from '../images/icons';

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
      Alert.alert('Logout', 'Are you Sure you want to logout?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            handleLogout();
          },
        },
      ]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
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
      <DrawerContentScrollView
        {...rest}
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {paddingHorizontal: 0},
        ]}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
        <View style={styles.profileInfo}>
          <Image source={LevelBadgeIcon} style={styles.levelBadge} />
          <Text style={styles.pointsToNext}>
            {pointsToNextLevel} pts to Level {level + 1}
          </Text>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <EarnedPointsIcon />
              <Text style={styles.statLabel}>EARNED POINTS</Text>
              <Text style={styles.statValue}>{points}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ClassRankIcon />
              <Text style={styles.statLabel}>CLASS RANK</Text>
              <Text style={styles.statValue}>#{classRank}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <SchoolRankIcon />
              <Text style={styles.statLabel}>SCHOOL RANK</Text>
              <Text style={styles.statValue}>#{schoolRank}</Text>
            </View>
          </View>
        </View>
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
            icon={<UserIcon />}
            label="Activities"
            onPress={() => {
              props.navigation.navigate('Activities');
            }}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Challenge"
            onPress={() => {
              props.navigation.navigate('Challenges');
            }}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Redeem Points"
            onPress={() => {
              props.navigation.navigate('RedeemPoints');
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
            label="Notification"
            onPress={() => {}}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Settings"
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
          />
          <CustomDrawerItem
            icon={<UserIcon />}
            label="Help Center"
            onPress={() => {
              props.navigation.navigate('HelpCenter');
            }}
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
    // backgroundColor: 'red',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  itemsContainer: {
    paddingVertical: 10,
    // backgroundColor: '#fff',
  },
  gap: {
    height: 16,
  },
  profileInfo: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  levelBadge: {
    width: 122,
    height: 100,
    marginTop: 16,
  },
  pointsToNext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#3D9D91',
    borderRadius: 20,
    padding: 10,
    // width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#fff',
    opacity: 0.3,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

export default CustomDrawerContent;
