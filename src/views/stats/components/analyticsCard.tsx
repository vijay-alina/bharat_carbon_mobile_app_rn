import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const colors = ['#2AD1A0', '#4C7CF3', '#FF8B3E', '#7E5AFF', '#FFD14F'];
const percentages = [25, 20, 20, 15, 20]; // Must total 100

const radius = 100;
const cx = 140;
const cy = 140;

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, // ← '0' here makes it draw in the opposite direction
  ].join(' ');
};

const AnalyticsCard = () => {
  let endAngle = 180;
  const arcPaths = percentages.map((p, idx) => {
    const sweep = (p / 100) * 180;
    const startAngle = endAngle - sweep;
    const d = describeArc(cx, cy, radius, startAngle, endAngle);
    const segment = (
      <Path
        key={idx}
        d={d}
        stroke={colors[idx]}
        strokeWidth={20}
        fill="none"
        strokeLinecap="round"
      />
    );
    endAngle = startAngle;
    return segment;
  });

  return (
    <View style={styles.card}>
      <Svg width="280" height="140">
        {arcPaths}
      </Svg>
      <View style={styles.valueBox}>
        <Text style={styles.value}>20.3</Text>
        <Text style={styles.unit}>Kg, CO₂</Text>
      </View>
    </View>
  );
};

export default AnalyticsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 3,
  },
  valueBox: {
    marginTop: -10,
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C2B36',
  },
  unit: {
    fontSize: 14,
    color: '#888',
  },
});
