import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text> Herllo</Text>
    </View>
  );
};

export default StatisticsScreen; // Export the component

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
