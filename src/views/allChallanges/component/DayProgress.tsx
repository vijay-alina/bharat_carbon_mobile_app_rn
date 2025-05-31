import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  currentDay: number;
  totalDays: number;
};

export const DayProgress: React.FC<Props> = ({ currentDay, totalDays }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalDays }).map((_, index) => {
        const day = index + 1;
        const isActive = day <= currentDay;
        return (
          <View key={day} style={[styles.dayBox, isActive && styles.active]}>
            <Text style={[styles.dayText, isActive && styles.activeText]}>{day.toString().padStart(2, '0')}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  dayBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  dayText: {
    fontSize: 12,
  },
  active: {
    backgroundColor: '#10B981',
    borderColor: '#000',
    borderWidth: 2,
  },
  activeText: {
    color: '#fff',
  },
});
