import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  G,
  Rect,
  Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';
import {GrowthGraph} from '../../../features/myProfile/myProfileType';

const {width: screenWidth} = Dimensions.get('window');
const PADDING = 16;
const SIDE_PADDING = 30;
const pointSpacing = 60;
const chartHeight = 200;
const chartTopPadding = 70;
const chartBottomPadding = 30;
const svgHeight = chartHeight + chartTopPadding + chartBottomPadding;

const labels: string[] = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

type Point = [number, number];

const getLinePath = (
  data: number[],
  minY: number,
  maxY: number,
): {path: string | null; points: Point[]} => {
  const scaleY = chartHeight / (maxY - minY);

  const points: Point[] = data.map((y, index) => [
    SIDE_PADDING + index * pointSpacing,
    chartTopPadding + chartHeight - (y - minY) * scaleY,
  ]);

  const lineGenerator = shape
    .line<Point>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(shape.curveMonotoneX);

  return {
    path: lineGenerator(points),
    points,
  };
};

const getAreaPath = (
  data: number[],
  minY: number,
  maxY: number,
): string | null => {
  const scaleY = chartHeight / (maxY - minY);

  const points: Point[] = data.map((y, index) => [
    SIDE_PADDING + index * pointSpacing,
    chartTopPadding + chartHeight - (y - minY) * scaleY,
  ]);

  const areaGenerator = shape
    .area<Point>()
    .x(d => d[0])
    .y0(chartTopPadding + chartHeight)
    .y1(d => d[1])
    .curve(shape.curveMonotoneX);

  return areaGenerator(points);
};

interface LineChartCustomProps {
  growtgGraph: GrowthGraph;
}

const LineChartCustom: React.FC<LineChartCustomProps> = ({growtgGraph}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const currentMonth = new Date().getMonth() + 1;
  const showLabels = labels.slice(0, currentMonth);
  const pointsData: number[] = growtgGraph?.pointsData.slice(0, currentMonth);
  const emissionsData: number[] = growtgGraph?.emissionsData.slice(
    0,
    currentMonth,
  );
  const numDataPoints = currentMonth;
  const chartContentWidth =
    SIDE_PADDING * 2 + pointSpacing * (numDataPoints - 1);

  const allValues = [...pointsData, ...emissionsData];
  const minY = Math.min(...allValues);
  const maxY = Math.max(...allValues);

  const pointsLine = getLinePath(pointsData, minY, maxY);
  const emissionsLine = getLinePath(emissionsData, minY, maxY);

  const handleTouch = (evt: any) => {
    const touchX = evt.nativeEvent.locationX;
    const index = Math.round((touchX - SIDE_PADDING) / pointSpacing);
    if (index >= 0 && index < pointsData.length) {
      setActiveIndex(index);
    }
  };

  const clampX = (x: number) =>
    Math.min(Math.max(x, SIDE_PADDING), chartContentWidth - SIDE_PADDING);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Growth</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableWithoutFeedback onPressIn={handleTouch}>
          <View style={{width: chartContentWidth}}>
            <Svg width={chartContentWidth} height={svgHeight}>
              <Defs>
                <LinearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#009688" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="#009688" stopOpacity="0" />
                </LinearGradient>
                <LinearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#FFA500" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
                </LinearGradient>
                <LinearGradient
                  id="highlightGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1">
                  <Stop offset="0%" stopColor="#e0f7fa" stopOpacity="0.8" />
                  <Stop offset="100%" stopColor="#e0f7fa" stopOpacity="0.2" />
                </LinearGradient>
              </Defs>

              {activeIndex !== null &&
                (() => {
                  const x = clampX(pointsLine.points[activeIndex][0]);
                  const barWidth = pointSpacing;
                  return (
                    <Rect
                      x={x - barWidth / 2}
                      y={0}
                      width={barWidth}
                      height={svgHeight}
                      rx={12}
                      ry={12}
                      fill="url(#highlightGradient)"
                    />
                  );
                })()}

              <Path
                d={getAreaPath(pointsData, minY, maxY) || ''}
                fill="url(#greenGradient)"
              />
              <Path
                d={getAreaPath(emissionsData, minY, maxY) || ''}
                fill="url(#orangeGradient)"
              />

              <Path
                d={pointsLine.path || ''}
                stroke="#009688"
                strokeWidth={2}
                fill="none"
              />
              <Path
                d={emissionsLine.path || ''}
                stroke="#FFA500"
                strokeWidth={2}
                fill="none"
              />

              {activeIndex !== null && (
                <G>
                  <G>
                    {(() => {
                      const x = clampX(pointsLine.points[activeIndex][0]);
                      const y = pointsLine.points[activeIndex][1];
                      return (
                        <>
                          <Rect
                            x={x - 30}
                            y={Math.max(y - 50, 10)}
                            rx={6}
                            ry={6}
                            width={60}
                            height={24}
                            fill="#024064"
                          />
                          <Path
                            d={`M${x - 5},${Math.max(y - 26, 10)} L${
                              x + 5
                            },${Math.max(y - 26, 10)} L${x},${Math.max(
                              y - 18,
                              10,
                            )} Z`}
                            fill="#024064"
                          />
                          <SvgText
                            x={x}
                            y={Math.max(y - 34, 10)}
                            fontSize="12"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="white">
                            {`${pointsData[activeIndex]} Pts`}
                          </SvgText>
                          <Circle
                            cx={x}
                            cy={y}
                            r={6}
                            stroke="#009688"
                            strokeWidth={2}
                            fill="white"
                          />
                        </>
                      );
                    })()}
                  </G>
                  <G>
                    {(() => {
                      const x = clampX(emissionsLine.points[activeIndex][0]);
                      const y = emissionsLine.points[activeIndex][1];
                      return (
                        <>
                          <Rect
                            x={x - 30}
                            y={Math.max(y - 50, 10)}
                            rx={6}
                            ry={6}
                            width={60}
                            height={24}
                            fill="#024064"
                          />
                          <Path
                            d={`M${x - 6},${Math.max(y - 26, 10)} L${
                              x + 6
                            },${Math.max(y - 26, 10)} L${x},${Math.max(
                              y - 18,
                              10,
                            )} Z`}
                            fill="#024064"
                          />
                          <SvgText
                            x={x}
                            y={Math.max(y - 34, 10)}
                            fontSize="12"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="white">
                            {emissionsData[activeIndex]}
                          </SvgText>
                          <Circle
                            cx={x}
                            cy={y}
                            r={6}
                            stroke="#FFA500"
                            strokeWidth={2}
                            fill="white"
                          />
                        </>
                      );
                    })()}
                  </G>
                </G>
              )}
            </Svg>

            <View style={[styles.labelsOverlay, {width: chartContentWidth}]}>
              {pointsLine.points.map(([x], i) => (
                <Text
                  key={`label-${i}`}
                  style={[
                    styles.label,
                    {
                      left: x,
                      transform: [{translateX: -25}],
                    },
                  ]}>
                  {showLabels[i]}
                </Text>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Legend Section */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#009688'}]} />
          <Text style={styles.legendText}>Points</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#FFA500'}]} />
          <Text style={styles.legendText}>Emissions</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: PADDING,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#024064',
    marginBottom: 8,
  },
  labelsOverlay: {
    position: 'relative',
    height: 20,
    marginTop: 8,
  },
  label: {
    position: 'absolute',
    width: 50,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#024064',
  },
});

export default LineChartCustom;
