import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { Colors } from '../../../constants/colors';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 3 * 16) / 2;

type VerticalClimateCardProps = {
  imageUri: ImageSourcePropType;
  title: string;
  subtitle: string;
  buttonText: string;
  gradientColors: string[];
  icon?: React.ReactNode;
};

const VerticalClimateCard: React.FC<VerticalClimateCardProps> = ({
  imageUri,
  title,
  subtitle,
  buttonText,
  gradientColors,
  icon,
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.card}
    >
      <Image source={imageUri} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        {icon}
        <Text style={icon ? styles.buttonText : styles.buttonText2}>{buttonText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily:'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
    fontFamily:'Montserrat',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Montserrat-Medium',
    color: Colors.PrimaryBlue,
    fontSize: 10,
    fontWeight: '500',
  },
  buttonText2: {
    fontFamily: 'Montserrat-Medium',
    color: '#17A086',
    fontSize: 10,
    fontWeight: '500',
  },
});

export default VerticalClimateCard;
