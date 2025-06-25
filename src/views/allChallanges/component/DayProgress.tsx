import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

type Props = {
  currentDay: number;
  totalDays: number;
  ongoingChallenge: any;
};

export const DayProgress: React.FC<Props> = ({
  currentDay,
  totalDays,
  ongoingChallenge,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.mainContainer}>
      <View style={styles.container}>
        {/* {Array.from({length: totalDays}).map((_, index) => {
          const day = index + 1;
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isUpcoming = day > currentDay;

          return (
            <View key={day} style={styles.stepWrapper}>
              <Text style={styles.dayNumber}>
                {day.toString().padStart(2, '0')}
              </Text>

              <View style={styles.boxAndLine}>
                <View
                  style={[
                    styles.dayBox,
                    isCompleted && styles.completedBox,
                    isCurrent && styles.currentBox,
                    isUpcoming && styles.upcomingBox,
                  ]}>
                  <Text style={isCurrent ? styles.tickCurrent : styles.tick}>
                    ✓
                  </Text>
                </View>

                {day !== totalDays && (
                  <View
                    style={[
                      styles.line,
                      isCompleted && styles.completedLine,
                      isCurrent && styles.currentLine,
                    ]}
                  />
                )}
              </View>
            </View>
          );
        })} */}

        {Array.from({length: totalDays}).map((_, index) => {
          const day = index + 1;

          const startDate = new Date(ongoingChallenge[0]?.startDate);
          const targetDate = new Date(startDate);
          targetDate.setDate(startDate.getDate() + index);

          const recordExists = ongoingChallenge[0]?.challengeRecord?.some(
            (record: any) => {
              const recordDate = new Date(record.date);
              return (
                recordDate.getFullYear() === targetDate.getFullYear() &&
                recordDate.getMonth() === targetDate.getMonth() &&
                recordDate.getDate() === targetDate.getDate()
              );
            },
          );

          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isExits = recordExists;
          const isNotFound = !recordExists; // treat as upcoming if no data

          return (
            <View key={day} style={styles.stepWrapper}>
              <Text style={styles.dayNumber}>
                {day.toString().padStart(2, '0')}
              </Text>

              <View style={styles.boxAndLine}>
                <View
                  style={[
                    styles.dayBox,
                    isExits && styles.completedBox,
                    isCurrent && styles.currentBox,
                    isNotFound && styles.upcomingBox,
                  ]}>
                  <Text style={isCurrent ? styles.tickCurrent : styles.tick}>
                    ✓
                  </Text>
                </View>

                {day !== totalDays && (
                  <View
                    style={[
                      styles.line,
                      isExits && styles.completedLine,
                      isCompleted && styles.completedLine,
                    ]}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingRight: 16, // Ensure no clipping on the right
  },
  stepWrapper: {
    flexDirection: 'column',
    // marginRight: 8, // spacing between steps
  },
  dayNumber: {
    fontSize: 12,
    marginLeft: 8,
    marginBottom: 4,
    color: '#333',
  },
  boxAndLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  completedBox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    borderWidth: 2,
  },
  currentBox: {
    backgroundColor: '#E0E0E0',
    borderColor: '#10B981',
    borderWidth: 2,
  },
  upcomingBox: {
    backgroundColor: '#E0E0E0',
    borderColor: '#C4C4C4',
  },
  tick: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tickCurrent: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: 'bold',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#C4C4C4',
  },
  completedLine: {
    backgroundColor: '#10B981',
  },
  currentLine: {
    backgroundColor: '#10B981',
  },
});
