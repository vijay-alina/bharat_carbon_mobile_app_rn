import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const CIRCLE_RADIUS = 80;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const STROKE_WIDTH = 8;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimatedProgressBar = () => {
  const progress = useSharedValue(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  
  // Background theme colors based on progress
  const themes = [
    { range: [0, 20], colors: ['#2c3e50', '#34495e'], strokeColor: '#6c5ce7' },
    { range: [21, 40], colors: ['#667eea', '#764ba2'], strokeColor: '#74b9ff' },
    { range: [41, 60], colors: ['#56ab2f', '#a8e6cf'], strokeColor: '#00b894' },
    { range: [61, 80], colors: ['#ff6b6b', '#ffd93d'], strokeColor: '#fdcb6e' },
    { range: [81, 100], colors: ['#ff416c', '#ff4b2b'], strokeColor: '#e17055' },
  ];

  // Animated background gradient
  const backgroundStyle = useAnimatedStyle(() => {
    const color1 = interpolateColor(
      progress.value,
      [0, 25, 50, 75, 100],
      ['#2c3e50', '#667eea', '#56ab2f', '#ff6b6b', '#ff416c']
    );
    
    const color2 = interpolateColor(
      progress.value,
      [0, 25, 50, 75, 100],
      ['#34495e', '#764ba2', '#a8e6cf', '#ffd93d', '#ff4b2b']
    );

    return {
      flex: 1,
    };
  });

  // Animated progress circle
  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 100],
      [CIRCLE_CIRCUMFERENCE, 0]
    );

    return {
      strokeDashoffset,
    };
  });

  // Animated stroke color
  const animatedStrokeStyle = useAnimatedStyle(() => {
    const strokeColor = interpolateColor(
      progress.value,
      [0, 25, 50, 75, 100],
      ['#6c5ce7', '#74b9ff', '#00b894', '#fdcb6e', '#e17055']
    );

    return {
      color: strokeColor,
    };
  });

  // Progress text animation
  const progressTextStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 100], [1, 1.1], 'clamp');
    
    return {
      transform: [{ scale }],
    };
  });

  // Container animation
  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 100], [1, 1.05], 'clamp');
    
    return {
      transform: [{ scale }],
    };
  });

  // Particle animation
  const particleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 20, 80, 100], [0, 1, 1, 0]);
    
    return {
      opacity,
    };
  });

  // Update display progress
  const updateDisplayProgress = (value) => {
    setDisplayProgress(Math.round(value));
  };

  // Animate progress change
  const animateProgress = (targetProgress) => {
    progress.value = withTiming(
      targetProgress,
      {
        duration: 1000,
      },
      (finished) => {
        if (finished) {
          runOnJS(updateDisplayProgress)(targetProgress);
        }
      }
    );
  };

  // Slider gesture
  const sliderGesture = Gesture.Pan()
    .onUpdate((event) => {
      const sliderWidth = width - 80;
      const newProgress = Math.max(0, Math.min(100, (event.x / sliderWidth) * 100));
      progress.value = newProgress;
      runOnJS(updateDisplayProgress)(newProgress);
    });

  // Auto demo on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      let demo = 0;
      const demoInterval = setInterval(() => {
        demo += 2;
        animateProgress(demo);
        if (demo >= 100) {
          clearInterval(demoInterval);
          setTimeout(() => animateProgress(0), 2000);
        }
      }, 50);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get current background colors
  const getCurrentColors = () => {
    const theme = themes.find(t => 
      displayProgress >= t.range[0] && displayProgress <= t.range[1]
    );
    return theme ? theme.colors : themes[0].colors;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={getCurrentColors()}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Floating particles */}
        <Animated.View style={[styles.particle, particleStyle, { top: '20%', left: '10%' }]} />
        <Animated.View style={[styles.particle, particleStyle, { top: '40%', right: '15%' }]} />
        <Animated.View style={[styles.particle, particleStyle, { bottom: '30%', left: '20%' }]} />
        <Animated.View style={[styles.particle, particleStyle, { bottom: '50%', right: '25%' }]} />

        <View style={styles.content}>
          <Text style={styles.title}>Animated Progress</Text>
          
          <Animated.View style={[styles.progressContainer, containerStyle]}>
            <Svg width={200} height={200} style={styles.progressRing}>
              {/* Background circle */}
              <Circle
                cx={100}
                cy={100}
                r={CIRCLE_RADIUS}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={STROKE_WIDTH}
                fill="transparent"
              />
              
              {/* Progress circle */}
              <AnimatedCircle
                cx={100}
                cy={100}
                r={CIRCLE_RADIUS}
                stroke={getCurrentColors()[1]}
                strokeWidth={STROKE_WIDTH}
                fill="transparent"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeLinecap="round"
                animatedProps={animatedCircleProps}
                transform={`rotate(-90 100 100)`}
              />
            </Svg>
            
            <Animated.View style={[styles.progressTextContainer, progressTextStyle]}>
              <Text style={styles.progressText}>{displayProgress}%</Text>
            </Animated.View>
          </Animated.View>

          {/* Custom Slider */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <Animated.View 
                style={[
                  styles.sliderFill,
                  {
                    width: `${displayProgress}%`,
                    backgroundColor: getCurrentColors()[1],
                  }
                ]}
              />
              <GestureDetector gesture={sliderGesture}>
                <Animated.View
                  style={[
                    styles.sliderThumb,
                    {
                      left: `${displayProgress}%`,
                      backgroundColor: getCurrentColors()[1],
                    }
                  ]}
                />
              </GestureDetector>
            </View>
          </View>

          {/* Control buttons */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => animateProgress(25)}
            >
              <Text style={styles.buttonText}>25%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => animateProgress(50)}
            >
              <Text style={styles.buttonText}>50%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => animateProgress(75)}
            >
              <Text style={styles.buttonText}>75%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => animateProgress(100)}
            >
              <Text style={styles.buttonText}>100%</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => animateProgress(0)}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  progressContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  progressRing: {
    position: 'absolute',
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  sliderContainer: {
    width: width - 80,
    height: 40,
    marginBottom: 30,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    height: 6,
    borderRadius: 3,
    position: 'absolute',
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -7,
    marginLeft: -10,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
  },
});

export default AnimatedProgressBar;