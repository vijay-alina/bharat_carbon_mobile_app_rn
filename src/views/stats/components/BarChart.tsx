import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Svg, {Rect, G, Text as SvgText} from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const data = [
  {label: 'JAN', value: 4.3},
  {label: 'FEB', value: 4.2},
  {label: 'MAR', value: 3.8},
  {label: 'APR', value: 3.8},
  {label: 'MAY', value: 0},
  {label: 'JUN', value: 0},
  {label: 'JUL', value: 2.3},
  {label: 'AUG', value: 3.1},
  {label: 'SEP', value: 4.0},
  {label: 'OCT', value: 3.5},
  {label: 'NOV', value: 2.9},
  {label: 'DEC', value: 1.8},
];

const maxValue = Math.max(...data.map(d => d.value), 5);
const chartHeight = 120;
const barWidth = 40;
const barSpacing = 22;
const svgHeight = chartHeight + 40; // includes space for values and labels
const svgWidth = data.length * (barWidth + barSpacing);

const BarCard = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Total Emissions</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>This Year</Text>
        </View>
      </View>

      {/* Total Text */}
      <Text style={styles.totalText}>
        {total.toFixed(1)} <Text style={styles.unit}>Kg CO₂e</Text>
      </Text>

      {/* Scrollable Bar Chart */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        onStartShouldSetResponderCapture={() => true} // Prevent parent slide
        contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 10}}>
        <Svg width={svgWidth} height={svgHeight}>
          {data.map((item, index) => {
            const x = index * (barWidth + barSpacing) + barWidth / 2;
            const barHeight = (item.value / maxValue) * chartHeight;
            const isActive = item.label === 'FEB';

            return (
              <G key={index}>
                {/* Value text */}
                {item.value > 0 && (
                  <SvgText
                    x={x}
                    y={chartHeight - barHeight - 6}
                    fontSize="10"
                    fontWeight="600"
                    fill="#333"
                    textAnchor="middle">
                    {item.value.toFixed(1)}
                  </SvgText>
                )}

                {/* Bar */}
                <Rect
                  x={x - barWidth / 2}
                  y={chartHeight - barHeight}
                  width={barWidth}
                  height={barHeight}
                  rx={6}
                  ry={6}
                  fill={isActive ? '#23B397' : '#CFF3ED'}
                />

                {/* Label */}
                <SvgText
                  x={x}
                  y={chartHeight + 16}
                  fontSize="10"
                  fill="#4A4A4A"
                  textAnchor="middle">
                  {item.label}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </ScrollView>
    </View>
  );
};

export default BarCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: screenWidth - 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#1C2D35',
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#F3F6F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 10,
    color: '#4A4A4A',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#23B397',
    marginTop: 8,
    marginBottom: 16,
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4A4A4A',
  },
});
