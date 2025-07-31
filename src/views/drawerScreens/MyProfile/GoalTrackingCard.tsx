import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';

const {width} = Dimensions.get('window');

interface GoalTrackingCardProps {
  goalTracking: {totalPoints: number};
}

const GoalTrackingCard: React.FC<GoalTrackingCardProps> = ({goalTracking}) => {
  const achievedPoints = goalTracking?.totalPoints;
  const targetPoints = goalTracking?.totalPoints + 500;
  const progress = achievedPoints / targetPoints;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Goal Tracking</Text>

      <View style={styles.pointsRow}>
        <Text style={styles.achievedPoints}>{achievedPoints}</Text>
        <Text style={styles.ptsLabel}> pts</Text>
      </View>

      <Text style={styles.subText}>Points Achieved</Text>

      <View style={styles.targetBox}>
        <Text style={styles.targetText}>
          Target Points:{' '}
          <Text style={{fontWeight: 'bold'}}>{targetPoints} pts</Text>
        </Text>
      </View>

      <View style={styles.progressWrapper}>
        <Progress.Bar
          progress={progress}
          width={width - 64} // card padding = 16*2
          height={18}
          borderRadius={50}
          color="#2ED3C9"
          unfilledColor="#d0f0f5"
          borderWidth={0}
        />
        <View style={styles.progessText}>
          <Text style={styles.progessTitle}>Progress</Text>
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#024064',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 0,
  },
  achievedPoints: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#17A086',
  },
  ptsLabel: {
    fontSize: 18,
    color: '#024064',
    marginBottom: 2,
  },
  subText: {
    fontSize: 14,
    color: '#808385ff',
    marginTop: 4,
    fontWeight: '500',
    marginBottom: 10,
  },
  targetBox: {
    backgroundColor: '#FF832B33', // 20% opacity
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  targetText: {
    color: '#FF832B',
    fontSize: 12,
  },
  progressWrapper: {
    marginTop: 10,
  },
  progessText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  progessTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#024064',
  },

  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#024064',
  },
});

export default GoalTrackingCard;
