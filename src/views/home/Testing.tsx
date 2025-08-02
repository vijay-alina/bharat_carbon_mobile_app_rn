import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {MenuIcon, PointsStarIcon} from '../../images/icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../hooks/hooks';

const {width} = Dimensions.get('window');
const size = width * 0.7;
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;
const centerX = size / 2;
const centerY = size / 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Co2TrackerCard = () => {
  const navigation = useNavigation();
  const profiledata = useAppSelector(state => state.myProfile.myProfile);
  const [co2Value, setCo2Value] = useState(0);
  const percentage = co2Value / (co2Value + 2000);

  const animatedProgress = useRef(new Animated.Value(0)).current;
  const animatedPointer = useRef({
    x: new Animated.Value(centerX),
    y: new Animated.Value(centerY),
  }).current;

  useEffect(() => {
    const angleRad = ((percentage * 360 - 90) * Math.PI) / 180;
    const newX = centerX + radius * Math.cos(angleRad);
    const newY = centerY + radius * Math.sin(angleRad);

    Animated.timing(animatedProgress, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedPointer.x, {
      toValue: newX,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedPointer.y, {
      toValue: newY,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const animatedStrokeOffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const getDynamicColors = () => {
    if (co2Value < 1000)
      return {
        gradient: [
          {offset: '0%', color: '#58AF30'},
          {offset: '100%', color: '#A8E063'},
        ],
        pointer: '#e3f0dd',
        text: '#333',
        track: '#58AF30',
        trackOpacity: 0.1,
      };
    else if (co2Value < 1500)
      return {
        gradient: [
          {offset: '0%', color: '#fdd835'},
          {offset: '100%', color: '#fbc02d'},
        ],
        pointer: '#ecebe1',
        text: '#333',
        track: '#fdd835',
        trackOpacity: 0.15,
      };
    else
      return {
        gradient: [
          {offset: '0%', color: '#F44336'},
          {offset: '100%', color: '#cb5353ff'},
        ],
        pointer: '#fff',
        text: '#333',
        track: '#F44336',
        trackOpacity: 0.15,
      };
  };

  const dynamicColors = getDynamicColors();

  const backgroundImageGood = require('../../images/icons/Image_1.png');
  const backgroundImageWarning = require('../../images/icons/Image_2.png');
  const backgroundImageCritical = require('../../images/icons/Image_3.png');

  const getBackgroundImage = () => {
    if (co2Value < 1000) return backgroundImageGood;
    else if (co2Value < 1500) return backgroundImageWarning;
    else return backgroundImageCritical;
  };

  const getBackgroundGradientColors = () => {
    if (co2Value < 1000)
      return ['rgba(88, 175, 48, 0.4)', 'rgba(218, 228, 214, 0.1)'];
    else if (co2Value < 1500)
      return ['rgba(235, 215, 149, 0.45)', 'rgba(247, 193, 15, 1)'];
    else return ['rgba(224, 67, 67, 0.4)', 'rgba(224, 67, 67, 0.1)'];
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  useEffect(() => {
    if (profiledata) {
      setCo2Value(Number(profiledata.statistics[0]?.value));
    }
  }, [profiledata]);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={getBackgroundImage()}
          //   style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover">
          <LinearGradient
            colors={getBackgroundGradientColors()}
            style={styles.overlay}
          />

          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={openDrawer}>
              <View style={styles.iconCircle}>
                <MenuIcon />
              </View>
            </TouchableOpacity>
            <View style={styles.rightContainer}>
              <View style={styles.pointsContainer}>
                <PointsStarIcon />
                <Text style={styles.pointsText}>590</Text>
              </View>
              <Image
                source={{uri: 'https://i.pravatar.cc/100'}}
                style={styles.avatar}
              />
            </View>
          </View>

          <View style={styles.circleWrapper}>
            <Svg width={size} height={size}>
              {/* Gradient Definition */}
              <Defs>
                <SvgGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%">
                  {dynamicColors.gradient.map((stop, index) => (
                    <Stop
                      key={index}
                      offset={stop.offset}
                      stopColor={stop.color}
                      stopOpacity="1"
                    />
                  ))}
                </SvgGradient>
              </Defs>

              {/* Background Track */}
              <Circle
                cx={centerX}
                cy={centerY}
                r={radius}
                stroke={dynamicColors.track}
                strokeOpacity={dynamicColors.trackOpacity || 0.2}
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Animated Progress */}
              <AnimatedCircle
                cx={centerX}
                cy={centerY}
                r={radius}
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference}, ${circumference}`}
                strokeDashoffset={animatedStrokeOffset}
                rotation="-90"
                originX={centerX}
                originY={centerY}
                strokeLinecap="round"
              />

              {/* Inner Circle */}
              <Circle
                cx={centerX}
                cy={centerY}
                r={radius - strokeWidth / 2}
                fill="white"
                stroke="#fff"
                strokeWidth={2}
                opacity={0.8}
              />
            </Svg>

            {/* Animated Pointer */}
            <Animated.View
              style={{
                position: 'absolute',
                left: Animated.subtract(animatedPointer.x, -43),
                top: Animated.subtract(animatedPointer.y, 12),
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: dynamicColors.pointer,
                borderWidth: 3,
                borderColor: dynamicColors.gradient[1].color,
              }}
            />

            {/* Center Text */}
            <View style={styles.textContainer}>
              <Text style={styles.year}>Year 2025</Text>
              <Text
                style={[
                  styles.value,
                  {color: dynamicColors.gradient[1].color},
                ]}>
                {co2Value?.toFixed(1)}
              </Text>
              <Text style={styles.unit}>kg CO₂e</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    // paddingTop: 20,
    backgroundColor: '#F8F8F8',
  },
  imageWrapper: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  background: {
    // alignItems: 'center',
    // paddingVertical: 60,
    // position: 'relative',
  },
  backgroundImage: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  menuContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pointsContainer: {
    backgroundColor: '#95f0df',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#000',
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },

  circleWrapper: {
    width: '100%',
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  year: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  unit: {
    fontSize: 16,
    color: '#555',
  },
});

export default Co2TrackerCard;
