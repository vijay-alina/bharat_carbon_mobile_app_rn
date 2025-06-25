import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  //   TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants/colors';
import CustomButton from '../../../common/button';
import StarIcon from '../../../images/icons/star_icon.png';
import {DEVICE_WIDTH} from '../../../utils/utils';
import {useAppDispatch} from '../../../hooks/hooks';
import {ongoingChallengeGet} from '../../../features/manageChallege/manageChallengeThunks';
import {useNavigation} from '@react-navigation/native';

interface NutritionCardProps {
  challengeData: any;
  challengeType: string;
  buttonDisabled: boolean;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
}

const NutritionCard: React.FC<NutritionCardProps> = ({
  challengeData,
  challengeType,
  buttonDisabled,
  setButtonDisabled,
  style,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const handlePress = async () => {
    setButtonDisabled(true);
    setIsSubmitting(true);

    try {
      const response = await dispatch(
        ongoingChallengeGet(challengeData.subChallangeType),
      ).unwrap();

      if (response.data.length > 0) {
        navigation.navigate('OngoingChallengeScreen', {
          challengeType,
          challengeData: challengeData,
          days: response.data[0]?.days,
        });
      } else {
        navigation.navigate('VegetarianChallengeScreen', {
          challengeType,
          challengeData: challengeData,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setTimeout(() => {
        setButtonDisabled(false);
        setIsSubmitting(false);
      }, 400);
    }
  };

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
          <Text style={styles.badgeText}> {challengeData?.points} Points</Text>
          <Text style={styles.badgeSubText}>
            per {challengeData?.days} days
          </Text>
        </View>
      </View>

      {/* Image */}
      <View style={{alignItems: 'center'}}>
        <Image
          source={challengeData?.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title + Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{challengeData?.title}</Text>
        <Text style={styles.subtitle}>{challengeData?.subtitle}</Text>
      </View>

      {/* Button */}
      <CustomButton
        text="Start Challenge"
        onPress={handlePress}
        backgroundColor="#fff"
        textColor={Colors.DarkGreen}
        style={styles.button}
        textStyle={styles.buttonText}
        disabled={buttonDisabled}
        loading={isSubmitting}
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
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    color: '#FECA03',
  },
  badgeSubText: {
    fontSize: 5,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 8,
    color: '#f0f0f0',
  },
  button: {
    // Add any ViewStyle properties for the button here if needed
  },
  buttonText: {
    color: Colors.DarkGreen,
    fontWeight: '600',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default NutritionCard;
