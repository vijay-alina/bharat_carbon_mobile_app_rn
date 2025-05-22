import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StarIcon} from '../../../images/icons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth - 32; // Full width with 16px margin on each side

type GradientChallengeCardProps = {
  pointsText: string;
  offerType: string;
  imageUri: ImageSourcePropType;
  title: string;
  description: string;
  keywords: string;
};

const GradientChallengeCard: React.FC<GradientChallengeCardProps> = ({
  pointsText,
  offerType,
  imageUri,
  title,
  description,
  keywords,
}) => {
  return (
    <LinearGradient colors={['#17a086', '#083a31']} style={styles.card}>
      <View style={styles.pointsContainer}>
        <Image source={StarIcon} style={styles.star} />
        <View>
          <Text style={styles.pointsText}>{pointsText}</Text>
          <Text style={styles.offerType}>{offerType}</Text>
        </View>
      </View>

      <Image source={imageUri} style={styles.image} resizeMode="contain" />

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
    padding: 12,
    marginVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  star: {
    height: 28,
    width: 28,
  },
  pointsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0D5F4F',
    position: 'absolute',
    left: 12,
    top: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  pointsText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  offerType: {
    color: '#FECA03',
    fontSize: 12,
  },
  image: {
    width: 263,
    height: 150,
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
