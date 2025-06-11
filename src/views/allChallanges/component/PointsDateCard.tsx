import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StarIcon } from '../../../images/icons';
import {Divider} from '../../../images/icons/divider.png'; // adjust the path if necessary

type PointsCardProps = {
  points: string;
  startDate: string;
  endDate: string;
  icon?: any; // optional icon/image source
};

export const PointsCard: React.FC<PointsCardProps> = ({ points, startDate, endDate, icon }) => {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#34D399', '#10B981']} // Green gradient
        style={styles.topSection}
      >
        <Image source={icon || StarIcon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.pointsText}>{points}</Text>
      </LinearGradient>

      <View style={styles.dateSection}>
        <Text style={styles.label}>Start Date</Text>
        <Text style={styles.date}>{startDate}</Text>
        {/* <Image source={Divider} style={styles.separator} resizeMode="contain" /> */}
        <View style={styles.separator} />
        <Text style={styles.label}>End Date</Text>
        <Text style={styles.date}>{endDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    borderRadius: 12,
    overflow: 'hidden', // Clip child corners
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  topSection: {
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  pointsText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  dateSection: {
    alignItems: 'center',
    padding: 10,
  },
  label: {
    color: '#0F3555',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Montserrat-Bold',
  },
  date: {
    color: '#5C6B7A',
    fontSize: 14,
    fontFamily: 'Montserrat-semiBold',
  },
  separator: {
    marginVertical: 8,
    height: 2,
    width: '100%',
    backgroundColor: '#E0E0E0', // Light gray color
  },
});
