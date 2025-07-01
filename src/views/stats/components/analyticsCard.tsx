import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {useAppSelector} from '../../../hooks/hooks';

// const colors = ['#2AD1A0', '#4C7CF3', '#FF8B3E', '#7E5AFF', '#FFD14F'];
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

const ShimmerView: React.FC<{
  width: number;
  height: number;
  borderRadius?: number;
}> = ({width, height, borderRadius = 4}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    };

    startShimmer();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[styles.shimmerContainer, {width, height, borderRadius}]}>
      <Animated.View
        style={[
          styles.shimmerGradient,
          {
            transform: [{translateX}],
          },
        ]}
      />
    </View>
  );
};

const ShimmerAnalyticsCard: React.FC = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    };

    startShimmer();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-280, 280],
  });

  // Generate the exact same arcs as original but with shimmer colors
  let currentAngle = 0;
  const gapBetweenArcs = 2;

  const shimmerArcPaths = percentages.map((p, idx) => {
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
        stroke="#e0e0e0"
        strokeWidth={20}
        fill="none"
        strokeLinecap="round"
      />
    );
    currentAngle += sweep;
    return segment;
  });

  return (
    <View style={styles.card}>
      {/* SVG with shimmer effect */}
      <View style={styles.svgContainer}>
        <Svg width="280" height="140">
          <Defs>
            <LinearGradient
              id="shimmerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <Stop offset="0%" stopColor="#e0e0e0" stopOpacity="1" />
              <Stop offset="50%" stopColor="#f5f5f5" stopOpacity="1" />
              <Stop offset="100%" stopColor="#e0e0e0" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          {shimmerArcPaths}
        </Svg>

        {/* Shimmer overlay */}
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              transform: [{translateX}],
            },
          ]}
        />
      </View>

      {/* Shimmer for value box */}
      <View style={styles.valueBox}>
        <ShimmerView width={80} height={28} borderRadius={6} />
        <View style={{height: 4}} />
        <ShimmerView width={60} height={14} borderRadius={4} />
      </View>

      {/* Shimmer for indicators */}
      <View style={styles.indicatorsContainer}>
        {/* First Row - 3 indicators */}
        <View style={styles.indicatorRow}>
          {labels.slice(0, 3).map((label, index) => (
            <View key={index} style={styles.indicator}>
              <ShimmerView width={12} height={12} borderRadius={3} />
              <View style={{width: 6}} />
              <ShimmerView
                width={label.length * 6 + 10}
                height={12}
                borderRadius={4}
              />
            </View>
          ))}
        </View>

        {/* Second Row - 2 indicators */}
        <View style={styles.indicatorRow}>
          {labels.slice(3, 5).map((label, index) => (
            <View key={index} style={styles.indicator}>
              <ShimmerView width={12} height={12} borderRadius={3} />
              <View style={{width: 6}} />
              <ShimmerView
                width={label.length * 6 + 10}
                height={12}
                borderRadius={4}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

interface AnalyticsCardProps {
  dataLoading: boolean;
}

const AnalyticsCard = ({dataLoading}: AnalyticsCardProps) => {
  const analyticsData = useAppSelector(state => state.analytics.analytics);

  console.log('analyticsData andddd', analyticsData);
  // If data is loading, show shimmer
  if (dataLoading) {
    return <ShimmerAnalyticsCard />;
  }

  // Start from 0 degrees (leftmost position) and go clockwise to 180 degrees (rightmost position)
  let currentAngle = 0; // This is the leftmost point of the semicircle
  const gapBetweenArcs = 2; // Small gap in degrees between arcs to show rounded caps

  const arcPaths = analyticsData?.category?.map((p, idx) => {
    console.log('ppppppppppppppp', p);
    // const sweep = (p?.percent / 100) * 180;
    const sweep = (50 / 100) * 180;
    let startAngle = currentAngle;
    let endAngle = currentAngle + sweep;

    // Add small gaps between segments (except for the first and last)
    if (idx > 0) {
      startAngle += gapBetweenArcs / 2;
    }
    if (idx < analyticsData?.category?.length - 1) {
      endAngle -= gapBetweenArcs / 2;
    }

    const d = describeArc(cx, cy, radius, startAngle, endAngle);

    const segment = (
      <Path
        key={idx}
        d={d}
        stroke={analyticsData?.category[idx]?.fill}
        strokeWidth={20}
        fill="none"
        strokeLinecap="round" // Rounded caps for all segments
      />
    );
    currentAngle += sweep; // Move to next position
    return segment;
  });

  // Split indicators into two rows: first 3, then 2
  const firstRowIndicators = analyticsData?.category.slice(0, 3) || [];
  const secondRowIndicators = analyticsData?.category?.slice(3, 5) || [];

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
        <Text style={styles.value}>
          {analyticsData?.totalEmission?.value?.toFixed(1)}
        </Text>
        <Text style={styles.unit}>{analyticsData?.totalEmission?.unit}</Text>
      </View>

      {/* Indicators Section */}
      <View style={styles.indicatorsContainer}>
        {/* First Row - 3 indicators */}
        <View style={styles.indicatorRow}>
          {firstRowIndicators.map((category, index) =>
            renderIndicator(category?.fill, category?.category, index),
          )}
        </View>

        {/* Second Row - 2 indicators */}
        <View style={styles.indicatorRow}>
          {secondRowIndicators.map((category, index) =>
            renderIndicator(category?.fill, category?.category, index + 3),
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
  // Shimmer styles
  shimmerContainer: {
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  shimmerGradient: {
    width: '30%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  svgContainer: {
    position: 'relative',
    width: 280,
    height: 140,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '30%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
