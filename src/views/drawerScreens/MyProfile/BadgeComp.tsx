import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/colors';

type BadgeCompProps = {
  badgeIcon: ImageSourcePropType;
  badgeName: string;
};

const BadgeComp: React.FC<BadgeCompProps> = ({badgeIcon, badgeName}) => {
  return (
    <View style={styles.container}>
      <Image source={badgeIcon} style={styles.badgeIcon} />
      <Text style={styles.badgeText}>{badgeName}</Text>
    </View>
  );
};

export default BadgeComp; // Export the component

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  badgeIcon: {
    width: 86,
    height: 64,
  },
  badgeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: Colors.PrimaryBlue,
  },
});
