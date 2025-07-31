import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {EcoImpact} from '../../../features/myProfile/myProfileType';

interface PieChartScreenProps {
  ecoImpact: EcoImpact[];
  totalPoints: number;
}

const PieChartScreen: React.FC<PieChartScreenProps> = ({
  ecoImpact,
  totalPoints,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Eco Impact</Text>

      <View style={styles.chartWrapper}>
        <PieChart
          style={{height: 300, width: 300}}
          data={ecoImpact}
          innerRadius={85}
          outerRadius={100}
          padAngle={0}
          startAngle={-Math.PI / 2} // Start at top (12 o'clock)
          endAngle={Math.PI * 1.5} // Full 360°
        />

        {/* Center total points text */}
        <View style={styles.centerTextWrapper}>
          <Text style={styles.totalPoints}>{totalPoints}</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>
      </View>

      <View style={styles.legendContainer}>
        {ecoImpact.map(item => {
          const percentage = (item.value / totalPoints) * 100;
          return (
            <View key={item.key} style={styles.legendItem}>
              <View
                style={[styles.colorDot, {backgroundColor: item.svg.fill}]}
              />
              <View style={styles.legendTextWrapper}>
                <Text style={styles.legendTitle}>
                  {item.label}{' '}
                  <Text style={styles.legendTitle1}>
                    ({percentage.toFixed(2)}%)
                  </Text>
                </Text>
                <Text style={styles.legendPoints}>{item.point} pts</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PieChartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#024064',
    marginBottom: -30,
  },
  chartWrapper: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTextWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPoints: {
    fontSize: 24,
    fontWeight: '700',
    color: '#024064',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#8BA7B8',
    marginTop: 2,
  },
  legendContainer: {
    width: '100%',
    marginBottom: 10,
    marginTop: -30,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 15,
    height: 15,
    borderRadius: 5,
    marginRight: 8,
  },
  legendTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  legendTitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  legendTitle1: {
    color: '#8BA7B8',
  },
  legendPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#024064',
  },
});
