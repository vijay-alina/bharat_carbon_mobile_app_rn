import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Header} from '../../common/header';
import {Colors} from '../../constants/colors';
import NutritionCard from '../allChallanges/component/NutritionCard';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import saveWater from '../../images/icons/tap_icon.png';
import saveEnergy from '../../images/icons/save_energy.png';
import wasteBox from '../../images/icons/waste_box.png';
import electricScooter from '../../images/icons/elctricScooter.png';
import publicTransport from '../../images/icons/publicTransport.png';
import carpoll from '../../images/icons/carpool.png';
import cycle from '../../images/icons/cycle.png';

const housingChallengesList = [
  {
    title: 'Save Water Challenge',
    subtitle: 'Reduce water usage(shorter showers, fix leaks, etc.)',
    points: 30,
    days: 'week',
    image: saveWater,
    subChallangeType: 'water',
  },
  {
    title: 'Energy Saver Challenge',
    subtitle: 'Switch to LED bulbs, unplug devices, use less electricity',
    points: 25,
    days: 'week',
    image: saveEnergy,
    subChallangeType: 'electricity',
  },
  {
    title: 'Waste Challenge',
    subtitle: 'Recycle, compost, reduce, conserve, reuse, sustain.',
    points: 20,
    days: 'week',
    image: wasteBox,
    subChallangeType: 'waste',
  },
];

const mobilityChallengesList = [
  {
    title: 'Walk or Cycle Challenge',
    subtitle: 'Walk or bike instead of using vehicles',
    points: 30,
    days: '3',
    image: cycle,
    subChallangeType: 'cycling',
  },
  {
    title: 'Use Public Transport',
    subtitle: 'Use bus, metro, or shared cabs instead of private vehicles',
    points: 30,
    days: '3',
    image: publicTransport,
    subChallangeType: 'publicTransport',
  },
  {
    title: 'Carpool with Others',
    subtitle: 'Share your ride with friends, colleagues, or family',
    points: 10,
    days: 'ride',
    image: carpoll,
    subChallangeType: 'carpool',
  },
  {
    title: 'Low-Emission Vehicle',
    subtitle: 'Use electric scooters, EVs, or hybrids',
    points: 10,
    days: 'trip',
    image: electricScooter,
    subChallangeType: 'electricScooter',
  },
];

const ChallengeList = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigaion = useNavigation<any>();
  const route = useRoute();

  const {challengeType} = route.params as {
    challengeType: string;
  };
  const tabBarHeight = useBottomTabBarHeight();

  const handleBack = () => {
    navigaion.navigate('ChallengeScreen');
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (Platform.OS === 'android') {
          handleBack();
          return true; // prevent default behavior
        }
        return false;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      <>
        <Header
          title={challengeType}
          isHomeScreen={true}
          onHomeClick={() => {
            navigaion.navigate('Home');
          }}
          onBackClick={() => {
            handleBack();
          }}
        />
        <Text style={styles.headerText}>
          {challengeType === 'Housing Challenge'
            ? 'Small home changes, big Climate wins!'
            : 'Travel smart, save fuel, and cut down emissions!'}
        </Text>
        <Text style={styles.descriptionText}>
          {challengeType === 'Housing Challenge'
            ? `Reduce Your household's carbon impact with daily, weekly and monthly energy-saving actions.`
            : 'Choose eco-friendly ways to move around and earn rewards while making a difference.'}
        </Text>
        <FlatList
          data={
            challengeType === 'Housing Challenge'
              ? housingChallengesList
              : mobilityChallengesList
          }
          contentContainerStyle={{paddingBottom: tabBarHeight}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item, index}) => (
            <NutritionCard
              key={index}
              challengeData={item}
              challengeType={challengeType}
              buttonDisabled={buttonDisabled}
              setButtonDisabled={setButtonDisabled}
            />
          )}
        />
      </>
    </View>
  );
};

export default ChallengeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: Colors.Neutrals900,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  descriptionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: Colors.Neutrals800,
    marginHorizontal: 16,
  },
});
