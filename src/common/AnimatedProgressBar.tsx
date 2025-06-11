/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const AnimatedProgressBar = ({
  progress = 0.43,
//   title = 'Keep it up! Slowly drop down!',
  height = 8,
  backgroundColor = '#E5E7EB',
  color1 = '#60A5FA', // Light blue
  color2 = '#2563EB', // Dark blue
  segmentCount = 8,
  animationDuration = 1500,
  skewAngle = 15, // Skew angle in degrees
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressPercentage = Math.round(progress * 100);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Create animated segments
  const renderAnimatedSegments = () => {
    const segments = [];
    const segmentWidth = 100 / segmentCount;

    for (let i = 0; i < segmentCount; i++) {
      const isEven = i % 2 === 0;
      const segmentColor = isEven ? color1 : color2;

      // Calculate when this segment should start and end
      const segmentStart = (i * segmentWidth) / 100;
      const segmentEnd = ((i + 1) * segmentWidth) / 100;

      const segmentWidth_animated = progressAnim.interpolate({
        inputRange: [segmentStart, segmentEnd],
        outputRange: ['0%', `${segmentWidth}%`],
        extrapolate: 'clamp',
      });

      const segmentOpacity = progressAnim.interpolate({
        inputRange: [segmentStart - 0.01, segmentStart],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });



      segments.push(
        <Animated.View
          key={i}
          style={[
            styles.segment,
            {
              width: segmentWidth_animated,
              backgroundColor: segmentColor,
              opacity: segmentOpacity,
              marginRight: i === segmentCount - 1 ? 0 : 1,
              transform: [{ skewX: `${skewAngle}deg` }],
            },
          ]}
        />,
      );
    }

    return segments;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, {backgroundColor, height}]}>
        <View style={styles.segmentsContainer}>{renderAnimatedSegments()}</View>
      </View>
      <Text style={styles.percentage}>{progressPercentage}%</Text>
    </View>
  );
};

export default AnimatedProgressBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 12,
  },
  progressContainer: {
    width: '70%',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  segmentsContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  segment: {
    height: '100%',
    overflow: 'hidden',
  },
  skewedSegment: {
    height: '100%',
    transform: [{ rotate: '15deg' }],
  },
  percentage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'right',
  },
});
