import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

interface DualCircularProgressProps {
  ChallengeOverview: {
    housingAccepetedPoint: number;
    housingEarnedPoint: number;
    mobilityAcceptedPoint: number;
    mobilityEarnedPoint: number;
    housingChallengeDone: number;
    mobilityChallengeDone: number;
  };
}

const DualCircularProgress: React.FC<DualCircularProgressProps> = ({
  ChallengeOverview,
}) => {
  const radius = 70;
  const strokeWidth = 20;
  const innerGap = 10;

  const outerRadius = radius;
  const innerRadius = radius - strokeWidth - innerGap;
  const size = (radius + strokeWidth) * 2;
  const center = size / 2;

  const calculateHalfCircumference = (r: number) => Math.PI * r;

  const getStrokeOffset = (earned: number, total: number, r: number) => {
    const percent = Math.min(earned / (total || 1), 1);
    const halfCircum = calculateHalfCircumference(r);
    return halfCircum * (1 - percent);
  };

  const outerCircum = calculateHalfCircumference(outerRadius);
  const innerCircum = calculateHalfCircumference(innerRadius);

  const totalPoints =
    ChallengeOverview?.housingEarnedPoint +
    ChallengeOverview?.mobilityEarnedPoint;

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Challenge Overview</Text>
        <View style={styles.pointsRow}>
          <Text style={styles.pointsValue}>{totalPoints}</Text>
          <Text style={styles.pointsUnit}>pts</Text>
        </View>
        <Text style={styles.pointsSubtitle}>Total Points Earned</Text>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.labelWithArrow}>
          <Text style={styles.centerLabel}>
            {ChallengeOverview?.housingEarnedPoint} pts
          </Text>
          <View style={styles.arrowDown} />
        </View>

        <Svg width={size} height={radius + strokeWidth + 10}>
          <G rotation="-180" origin={`${center}, ${center}`}>
            {/* Housing background */}
            <Circle
              cx={center}
              cy={center}
              r={outerRadius}
              stroke="#E6E6E6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={`${outerCircum}, ${outerCircum}`}
              strokeDashoffset={0}
            />
            {/* Housing progress */}
            <Circle
              cx={center}
              cy={center}
              r={outerRadius}
              stroke="#FF832B"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={`${outerCircum}, ${outerCircum}`}
              strokeDashoffset={getStrokeOffset(
                ChallengeOverview?.housingEarnedPoint,
                ChallengeOverview?.housingAccepetedPoint,
                outerRadius,
              )}
            />

            {/* Mobility background */}
            <Circle
              cx={center}
              cy={center}
              r={innerRadius}
              stroke="#E6E6E6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={`${innerCircum}, ${innerCircum}`}
              strokeDashoffset={0}
            />
            {/* Mobility progress */}
            <Circle
              cx={center}
              cy={center}
              r={innerRadius}
              stroke="#3B82F6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={`${innerCircum}, ${innerCircum}`}
              strokeDashoffset={getStrokeOffset(
                ChallengeOverview?.mobilityEarnedPoint,
                ChallengeOverview?.mobilityAcceptedPoint,
                innerRadius,
              )}
            />
          </G>
        </Svg>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.colorDot, {backgroundColor: '#FF832B'}]} />
          <View style={styles.legendTextWrapper}>
            <Text style={styles.legendTitle}>
              Housing{' '}
              <Text style={styles.legendTitle1}>
                ({ChallengeOverview?.housingChallengeDone} done)
              </Text>
            </Text>
            <Text style={styles.legendPoints}>
              {ChallengeOverview?.housingEarnedPoint} pts
            </Text>
          </View>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.colorDot, {backgroundColor: '#3B82F6'}]} />
          <View style={styles.legendTextWrapper}>
            <Text style={styles.legendTitle}>
              Mobility{' '}
              <Text style={styles.legendTitle1}>
                ({ChallengeOverview?.mobilityChallengeDone} done)
              </Text>
            </Text>
            <Text style={styles.legendPoints}>
              {ChallengeOverview?.mobilityEarnedPoint} pts
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DualCircularProgress;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    position: 'relative',
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#024064',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1A8875',
    marginRight: 4,
  },
  pointsUnit: {
    fontSize: 18,
    color: '#024064',
    marginBottom: 2,
  },
  pointsSubtitle: {
    fontSize: 14,
    color: '#808385',
    marginTop: 4,
    fontWeight: '500',
  },
  centerLabel: {
    fontSize: 12,
    backgroundColor: '#024064',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  labelWithArrow: {
    position: 'absolute',
    top: -18,
    left: '50%',
    transform: [{translateX: -30}],
    alignItems: 'center',
    zIndex: 2,
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#0047AB',
  },
  legendContainer: {
    width: '100%',
    marginTop: 10,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    marginRight: 10,
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
    color: '#000000',
  },
});
