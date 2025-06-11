import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants/colors';
import {getLetterSpacing} from '../../../utils/utils';
import {Text} from 'react-native';

type StatisticsItemCompProps = {
  icon: ImageSourcePropType;
  statType: string;
  statValue: string;
};

const StatisticsItemComp = (props: StatisticsItemCompProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
          <Image source={props.icon} style={styles.statIcon} />
          <View style={styles.marginLeft}>
            <Text style={styles.labelText}>{props.statType}</Text>
            <Text style={styles.valueText}>{props.statValue}</Text>
          </View>
      </View>
    </View>
  );
};

export default StatisticsItemComp;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.Neutral200,
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 1,
    paddingBottom: 4,
    paddingTop: 1,
    marginLeft: 16,
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statIcon: {
    width: 30,
    height: 30,
  },
  labelText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: getLetterSpacing(12, 4),
    color: Colors.BlueShades900,
  },
  valueText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: Colors.Black2,
  },
  marginLeft: {
    marginLeft: 8,
  },
});
