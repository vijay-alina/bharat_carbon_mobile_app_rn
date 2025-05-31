import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CardImage from '../../../images/icons/save_earth.png'
import { Colors } from '../../../constants/colors';

const VegetarianChallengeCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Vegetarian Challenge is On!</Text>
      <Text style={styles.subtitle}>
        Track vegetarian meals daily for 7 days.{'\n'}Earn 100 points!
      </Text>
      <Image
        source={CardImage} // Replace this with your actual image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.description}>
        Eat vegetarian every day for 7 days.
      </Text>
      <Text style={styles.footer}>All The best!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 26,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    margin: 16,
  },
  title: {
    fontSize: 22,
    color: Colors.GreenNormal,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.GreenNormal,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: Colors.GreenNormal,
    fontFamily: 'Montserrat-Regular',
  },
  footer: {
    fontSize: 20,
    color: '#2E7D32',
    fontFamily: 'Montserrat-Bold',

  },
});

export default VegetarianChallengeCard;
