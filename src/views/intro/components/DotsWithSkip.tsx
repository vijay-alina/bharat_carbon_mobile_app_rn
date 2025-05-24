import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type PaginationTopBarProps = {
  currentIndex?: number;
  totalSlides?: number;
  onSkip: () => void;
  onDotPress: (index: number) => void;
};

const PaginationTopBar = ({
  currentIndex = 0,
  totalSlides = 3,
  onSkip,
  onDotPress,
}: PaginationTopBarProps) => {
  return (
    <View style={styles.topBar}>
      {/* Dots */}
      <View style={styles.dotsContainer}>
        {[...Array(totalSlides)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
            onPress={() => onDotPress(index)}
          />
        ))}
      </View>

      {/* Skip Button */}
      <TouchableOpacity onPress={onSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#024064',
    width: '100%',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#5A7682',
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 20,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaginationTopBar;
