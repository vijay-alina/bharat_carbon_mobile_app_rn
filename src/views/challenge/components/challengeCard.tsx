import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { YellowFivePointedStarIcon } from '../../../images/icons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth - 32; // Full width with 16px margin on each side

type GradientChallengeCardProps = {
  pointsText: string;
  imageUri: string;
  title: string;
  description: string;
  keywords: string;
};

const GradientChallengeCard: React.FC<GradientChallengeCardProps> = ({
  pointsText,
  imageUri,
  title,
  description,
  keywords,
}) => {
  return (
    <LinearGradient colors={['#17a086', '#083a31']} style={styles.card}>
      <View style={styles.pointsContainer}>
        <YellowFivePointedStarIcon />
        <Text style={styles.pointsText}>{pointsText}</Text>
      </View>

      <Image
        source={{uri: imageUri}}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.keywords}>{keywords}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff33',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  pointsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  keywords: {
    fontSize: 12,
    color: '#b2dfdb',
    textAlign: 'center',
    marginTop: 6,
  },
});

export default GradientChallengeCard;
