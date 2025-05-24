import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/colors';

type Props = {
  co2Value: string;
};

const Co2ValueComponent = ({co2Value}: Props) => {
  return (
    <View style={styles.co2Container}>
      <Text style={styles.co2Label}>CO₂e (2025)</Text>
      <View style={styles.co2ValueContainer}>
        <Text style={styles.co2Value}>{co2Value}</Text>
      </View>
    </View>
  );
};

export default Co2ValueComponent;

const styles = StyleSheet.create({
  co2Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  co2Label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: Colors.NeutralsDark,
  },
  co2ValueContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: Colors.PrimaryBlue,
    borderRadius: 20,
  },
  co2Value: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.White,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
