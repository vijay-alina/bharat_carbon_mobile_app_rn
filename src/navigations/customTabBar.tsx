import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {TabActiveIndicator, TabAward, TabAwardActive, TabChartLine, TabChartLineActive, TabHome, TabHomeActive, TabTarget, TabTargetActive} from '../images/icons';

const CustomTabBar = ({state, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  // Get screen dimensions to calculate the curve
  const {width} = Dimensions.get('window');
  const tabWidth = width / 5;

  // Calculate the paths for the curved background
  const createPath = () => {
    const height = 60;
    const centerWidth = tabWidth;
    const circleRadius = 30;

    // Starting point
    let path = 'M0,0';

    // Draw line to the center start point
    path += `L${width / 2 - centerWidth / 2},0`;

    // Draw curve upwards
    path += `C${width / 2 - centerWidth / 4},0 ${
      width / 2 - circleRadius
    },${-circleRadius} ${width / 2},${-circleRadius}`;

    // Draw curve downwards
    path += `C${width / 2 + circleRadius},${-circleRadius} ${
      width / 2 + centerWidth / 4
    },0 ${width / 2 + centerWidth / 2},0`;

    // Draw line to the end point
    path += `L${width},0`;

    // Complete the path
    path += `L${width},${height}`;
    path += `L0,${height}`;
    path += 'Z';

    return path;
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <View style={styles.tabBarContainer}>
        {/* SVG for the curved background */}
        <Svg width={width} height={60} style={styles.background}>
          <Path d={createPath()} fill="#FFFFFF" />
        </Svg>

        {/* Tab items */}
        <View style={styles.tabItemsContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const isCenter = index === 2;

            const getIcon = () => {
              if (index === 0) {
                return isFocused ? <TabHomeActive /> : <TabHome />;
              }
              if (index === 1) {
                return isFocused ? <TabTargetActive /> :  <TabTarget />;
              }
              if (index === 3) {
                return isFocused ? <TabChartLineActive /> : <TabChartLine />;
              }
              if (index === 4) {
                return isFocused ? <TabAwardActive /> : <TabAward />;
              }
              return null;
            };

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (isCenter) {
              // Center button (Plus button)
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.centerButton}
                  onPress={onPress}>
                  <View style={styles.plusIcon}>
                    <View style={styles.plusHorizontal} />
                    <View style={styles.plusVertical} />
                  </View>
                </TouchableOpacity>
              );
            }

            // Regular tab item
            return (
              <TouchableOpacity
                key={index}
                style={styles.tabItem}
                onPress={onPress}>
                {getIcon()}
                {isFocused ? <TabActiveIndicator /> : <View style={styles.height} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  tabBarContainer: {
    position: 'relative',
    height: 60,
  },
  background: {
    position: 'absolute',
    bottom: 0,
  },
  tabItemsContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#59B88D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  plusIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  plusHorizontal: {
    position: 'absolute',
    width: 20,
    height: 3,
    backgroundColor: 'white',
    top: 8.5,
  },
  plusVertical: {
    position: 'absolute',
    width: 3,
    height: 20,
    backgroundColor: 'white',
    left: 8.5,
  },
  height: {
    height: 10,
  },
});

export default CustomTabBar;
