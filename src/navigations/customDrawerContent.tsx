import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProfileHeader} from '../components/profileHeader';

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
    <SafeAreaView style={styles.container}>
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
      <ScrollView style={styles.drawerItemsContainer}>
        <DrawerItemList {...rest} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

export default CustomDrawerContent;
