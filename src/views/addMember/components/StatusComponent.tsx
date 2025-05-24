import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/colors';

export enum Status {
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  NORMAL = 'NORMAL',
}

type Props = {
  status: Status;
};

const StatusComponent = ({status}: Props) => {

  const getBackgroundColorByStatus = (_status: Status): string => {
    switch (_status) {
      case Status.HIGH:
        return Colors.OrangeShades;
        case Status.VERY_HIGH:
          return Colors.RedShades;
        case Status.NORMAL:
          return Colors.GreenShades;
    }
  };

  const getTextColorByStatus = (_status: Status): string => {
    switch (_status) {
      case Status.HIGH:
        return Colors.OrangeNormal;
        case Status.VERY_HIGH:
          return Colors.RedNormal;
        case Status.NORMAL:
          return Colors.GreenNormal;
    }
  };

  const getStatusText = (_status: Status): string => {
    switch (_status) {
      case Status.HIGH:
        return 'High';
        case Status.VERY_HIGH:
          return 'Very High';
        case Status.NORMAL:
          return 'Normal';
    }
  };

  return (
    <View style={styles.co2Container}>
      <Text style={styles.co2Label}>Status</Text>
      <View style={[styles.co2ValueContainer, {backgroundColor: getBackgroundColorByStatus(status), borderRadius: 20}]}>
        <View style={[styles.dot, {backgroundColor: getTextColorByStatus(status)}]} />
        <Text style={[styles.co2Value, {color: getTextColorByStatus(status)}]}>{getStatusText(status)}</Text>
      </View>
    </View>
  );
};

export default StatusComponent;

const styles = StyleSheet.create({
  co2Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  co2Label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: Colors.NeutralsDark,
  },
  co2ValueContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  co2Value: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.White,
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
  },
});
