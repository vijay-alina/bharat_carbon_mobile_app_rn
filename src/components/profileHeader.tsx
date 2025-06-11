import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  ClassRankIcon,
  EarnedPointsIcon,
  LevelBadgeIcon,
  SchoolRankIcon,
} from '../images/icons';
import { Header } from '../common/header';

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
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    // backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
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
    borderRadius: 10,
    padding: 15,
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
