import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useRef} from 'react';
import AnalyticsCard from './components/analyticsCard';
import EmissionBreakdownCard from './components/emissionBreakdownCard';
import {Header} from '../../common/header';
import BarChart from './components/BarChart';

const screenWidth = Dimensions.get('window').width;

export const StatsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Array of slides - you can modify this based on your data
  const slides = [
    {id: 1, component: <BarChart />},
    {id: 2, component: <AnalyticsCard />},
    // Add more slides as needed
  ];

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index ? '#17a086' : '#C4C4C4',
                width: 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Analytics" isHomeScreen={true} />

      {/* Slider Area */}
      <View style={styles.sliderWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
          contentContainerStyle={styles.sliderContent}
          snapToInterval={screenWidth}
          decelerationRate="fast"
          snapToAlignment="start"
          onMomentumScrollEnd={handleScroll}>
          {slides.map((slide, index) => (
            <View key={slide.id} style={styles.slideContainer}>
              {slide.component}
            </View>
          ))}
        </ScrollView>

        {/* Dots Indicator */}
        {renderDots()}
      </View>

      {/* Below Slider Content */}
      <View style={styles.content}>
        <EmissionBreakdownCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  sliderWrapper: {
    marginTop: 20,
  },
  slider: {
    // height: 260,
  },
  sliderContent: {
    // Remove any flex properties that might interfere
  },
  slideContainer: {
    width: screenWidth,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
});
