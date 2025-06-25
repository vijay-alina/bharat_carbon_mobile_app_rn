import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const colors = ['#2AD1A0', '#4C7CF3', '#FF8B3E', '#7E5AFF', '#FFD14F'];
const percentages = [25, 20, 20, 30, 5]; // Must total 100
const labels = ['Nutrition', 'Housing', 'Mobility', 'Goods', 'Leisure']; // Add labels for indicators

const radius = 100;
const cx = 140;
const cy = 140;

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
};

const AnalyticsCard = () => {
  // Start from 0 degrees (leftmost position) and go clockwise to 180 degrees (rightmost position)
  let currentAngle = 0; // This is the leftmost point of the semicircle
  const gapBetweenArcs = 2; // Small gap in degrees between arcs to show rounded caps

  const arcPaths = percentages.map((p, idx) => {
    const sweep = (p / 100) * 180;
    let startAngle = currentAngle;
    let endAngle = currentAngle + sweep;

    // Add small gaps between segments (except for the first and last)
    if (idx > 0) {
      startAngle += gapBetweenArcs / 2;
    }
    if (idx < percentages.length - 1) {
      endAngle -= gapBetweenArcs / 2;
    }

    const d = describeArc(cx, cy, radius, startAngle, endAngle);

    const segment = (
      <Path
        key={idx}
        d={d}
        stroke={colors[idx]}
        strokeWidth={20}
        fill="none"
        strokeLinecap="round" // Rounded caps for all segments
      />
    );
    currentAngle += sweep; // Move to next position
    return segment;
  });

  // Split indicators into two rows: first 3, then 2
  const firstRowIndicators = colors.slice(0, 3);
  const secondRowIndicators = colors.slice(3, 5);

  const renderIndicator = (color: string, label: string, index: number) => (
    <View key={index} style={styles.indicator}>
      <View style={[styles.colorDot, {backgroundColor: color}]} />
      <Text style={styles.indicatorText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <Svg width="280" height="140">
        {arcPaths}
      </Svg>
      <View style={styles.valueBox}>
        <Text style={styles.value}>20.3</Text>
        <Text style={styles.unit}>Kg, CO₂</Text>
      </View>

      {/* Indicators Section */}
      <View style={styles.indicatorsContainer}>
        {/* First Row - 3 indicators */}
        <View style={styles.indicatorRow}>
          {firstRowIndicators.map((color, index) =>
            renderIndicator(color, labels[index], index),
          )}
        </View>

        {/* Second Row - 2 indicators */}
        <View style={styles.indicatorRow}>
          {secondRowIndicators.map((color, index) =>
            renderIndicator(color, labels[index + 3], index + 3),
          )}
        </View>
      </View>
    </View>
  );
};

export default AnalyticsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 12,
    // elevation: 3,
  },
  valueBox: {
    marginTop: -10,
    alignItems: 'center',
    marginBottom: 20,
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
  indicatorsContainer: {
    alignItems: 'center',
    // marginTop: 5,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 16,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 6,
  },
  indicatorText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
