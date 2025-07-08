import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Header} from '../common/header';

export type ProfileProps = {
  name: string;
  points: number;
  pointsToNextLevel: number;
  level: number;
  classRank: number;
  schoolRank: number;
  onBackPress: () => void;
};

export const ProfileHeader: FC<ProfileProps> = ({
  name,
  points,
  pointsToNextLevel,
  level,
  classRank,
  schoolRank,
  onBackPress,
}) => (
  <View style={styles.profileContainer}>
    <View style={styles.profileHeader}>
      <Header title="My Profile" onBackClick={onBackPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    // backgroundColor: 'orange',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
