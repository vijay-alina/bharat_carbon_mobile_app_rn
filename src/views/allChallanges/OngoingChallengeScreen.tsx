import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import {PointsCard} from './component/PointsDateCard';
import { DayProgress } from './component/DayProgress';

const OngoingChallengeScreen = () => {
  const progress = 0.32; // 32%

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>7-Day Vegetarian Challenge</Text>

      {/* Progress Bar */}
      <DayProgress currentDay={4} totalDays={7} />

      {/* Card Section */}
      <PointsCard points="+100 Points" startDate="8 Apr 2025" endDate="14 Apr 2025" />

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <ProgressCircle
          style={{ height: 80, width: 80 }}
          progress={progress}
          progressColor="#4CAF50"
          backgroundColor="#E0E0E0"
          strokeWidth={8}
        />
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>

      {/* Content */}
      <View style={styles.textSection}>
        <Text style={styles.heading}>Eat:</Text>
        <Text>Fruits, vegetables, grains, legumes, nuts, seeds</Text>

        <Text style={styles.heading}>Avoid:</Text>
        <Text>Meat, dairy, eggs, honey, animal-derived ingredients</Text>

        <Text style={styles.heading}>Focus on:</Text>
        <Text>Whole, plant-based foods for nutrition</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSection: {
    marginVertical: 16,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 12,
  },
});

export default OngoingChallengeScreen;
