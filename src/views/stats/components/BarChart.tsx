import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import Svg, {Rect, G, Text as SvgText} from 'react-native-svg';
import {useAppSelector} from '../../../hooks/hooks';

const screenWidth = Dimensions.get('window').width;

const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const chartHeight = 120;
const barWidth = 40;
const barSpacing = 22;
const svgHeight = chartHeight + 40; // includes space for values and labels
const svgWidth = monthName.length * (barWidth + barSpacing);

interface BarChartProps {
  dataLoading: boolean;
}

// Shimmer Component
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

// Shimmer Bar Chart Component
const ShimmerBarChart: React.FC = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        {monthName.map((_, index) => {
          const randomHeight =
            Math.random() * chartHeight * 0.8 + chartHeight * 0.2;
          return (
            <View
              key={index}
              style={{marginRight: barSpacing, alignItems: 'center'}}>
              {/* Shimmer value text */}
              <ShimmerView width={20} height={12} borderRadius={6} />
              <View style={{height: 6}} />

              {/* Shimmer bar */}
              <ShimmerView
                width={barWidth}
                height={randomHeight}
                borderRadius={6}
              />

              <View style={{height: 8}} />

              {/* Shimmer label */}
              <ShimmerView width={24} height={10} borderRadius={5} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const BarCard = ({dataLoading}: BarChartProps) => {
  const analyticsData = useAppSelector(state => state.analytics.analytics);

  const currentMonth = monthName[new Date().getMonth()];

  console.log('currentMonth:', currentMonth);

  let maxValue = 20; // default fallback

  // Check if monthlyEmission exists and has data
  if (
    analyticsData?.monthlyEmission &&
    analyticsData.monthlyEmission.length > 0
  ) {
    const values = analyticsData.monthlyEmission
      .map(d => d.value)
      .filter(v => v > 0);
    if (values.length > 0) {
      maxValue = Math.max(...values, 5); // minimum 5 to ensure visibility
    }
  }

  // const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        {dataLoading ? (
          <>
            <ShimmerView width={120} height={16} borderRadius={4} />
            <ShimmerView width={60} height={24} borderRadius={12} />
          </>
        ) : (
          <>
            <Text style={styles.title}>Total Emissions</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>This Year</Text>
            </View>
          </>
        )}
      </View>

      {/* Total Text */}
      {dataLoading ? (
        <View style={{marginTop: 8, marginBottom: 16}}>
          <ShimmerView width={150} height={28} borderRadius={6} />
        </View>
      ) : (
        <Text style={styles.totalText}>
          {analyticsData?.totalEmission?.value?.toFixed(1)}{' '}
          <Text style={styles.unit}>{analyticsData?.totalEmission?.unit}</Text>
        </Text>
      )}

      {/* Scrollable Bar Chart */}
      {dataLoading ? (
        <ShimmerBarChart />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          onStartShouldSetResponderCapture={() => true} // Prevent parent slide
          contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 10}}>
          <Svg width={svgWidth} height={svgHeight}>
            {analyticsData?.monthlyEmission?.map((item, index) => {
              const x = index * (barWidth + barSpacing) + barWidth / 2;
              const barHeight = (item.value / maxValue) * chartHeight;
              const isActive = item.name === currentMonth;

              return (
                <G key={index}>
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

                  {/* Value text inside top of bar */}
                  {item.value > 0 && barHeight > 15 && (
                    <SvgText
                      x={x}
                      y={chartHeight - barHeight + 15} // 15 units from the top edge of the bar
                      fontSize="10"
                      fontWeight="600"
                      fill={isActive ? '#fff' : '#333'}
                      textAnchor="middle">
                      {item.value.toFixed(1)}
                    </SvgText>
                  )}

                  {/* Label */}
                  <SvgText
                    x={x}
                    y={chartHeight + 16}
                    fontSize="10"
                    fill="#4A4A4A"
                    textAnchor="middle">
                    {item.name}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </ScrollView>
      )}
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
  // Shimmer Styles
  shimmerContainer: {
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
  shimmerGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    opacity: 0.7,
  },
});
