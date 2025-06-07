import React from 'react';
import {
  View,
  Text,
  StyleSheet,
//   TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants/colors';
import CustomButton from '../../../common/button';
import StarIcon from '../../../images/icons/star_icon.png';
import { DEVICE_WIDTH } from '../../../utils/utils';

interface NutritionCardProps {
  title: string;
  subtitle: string;
  points: number;
  days: number;
  imageSource: any; // For images (require/import)
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const NutritionCard: React.FC<NutritionCardProps> = ({
  title,
  subtitle,
  points,
  days,
  imageSource,
  onPress,
  style,
}) => {
  return (
    <LinearGradient
      colors={['#17A086', '#0A2210']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={[styles.cardContainer, style]}>
      {/* Badge */}
      <View style={styles.badge}>
        <Image source={StarIcon} style={styles.icon} resizeMode="contain" />
        <View style={styles.badgeTextContainer}>
          <Text style={styles.badgeText}> {points} Points</Text>
          <Text style={styles.badgeSubText}>per {days} days</Text>
        </View>
      </View>

      {/* Image */}
      <View style={{alignItems: 'center'}}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>

      {/* Title + Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Button */}
      <CustomButton
        text="Start Challenge"
        onPress={onPress}
        backgroundColor="#fff"
        textColor={Colors.DarkGreen}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    padding: 10,
    width: DEVICE_WIDTH * 0.46,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: Colors.ThickGreenShades900,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 4,
    alignItems: 'center',
    width: '55%',
  },
  badgeTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    color: '#FECA03',
  },
  badgeSubText: {
    fontSize: 8,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  image: {
    width: 104,
    height: 100,
    marginVertical: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  textContainer: {
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#f0f0f0',
  },
  button: {
    // Add any ViewStyle properties for the button here if needed
  },
  buttonText: {
    color: Colors.DarkGreen,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NutritionCard;
