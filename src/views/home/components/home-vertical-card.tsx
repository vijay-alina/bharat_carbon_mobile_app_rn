import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Make sure to install this

type VerticalClimateCardProps = {
  imageUri: string;
  title: string;
  subtitle: string;
  buttonText: string;
};

const VerticalClimateCard: React.FC<VerticalClimateCardProps> = ({ imageUri, title, subtitle, buttonText }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Icon name="upload" size={16} color="#000" style={{ marginRight: 6 }} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 175,
    backgroundColor: '#f97b33',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    // margin: 5,
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
  },
  subtitle: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default VerticalClimateCard;
