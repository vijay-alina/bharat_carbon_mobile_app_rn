import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BackIcon,
  ClassRankIcon,
  EarnedPointsIcon,
  LevelBadgeIcon,
  SchoolRankIcon,
} from '../images/icons';

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
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Profile</Text>
    </View>
    <View style={styles.profileInfo}>
      <LevelBadgeIcon />
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
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    width: 80,
    height: 80,
    backgroundColor: '#FFC107',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Add shadow for Android
    elevation: 5,
  },
  levelNumber: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  levelLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
    width: '100%',
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
