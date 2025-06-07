import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Header} from '../../common/header';
import {Colors} from '../../constants/colors';
import NutritionCard from '../allChallanges/component/NutritionCard';
import { useNavigation } from '@react-navigation/native';

const challengesList = [
  {
    title: 'Vegan',
    subtitle: 'No meat, dairy, or animal products',
    points: 12,
    days: 3,
  },
  {
    title: 'Eggitarian',
    subtitle: 'No meat, dairy, or animal products',
    points: 12,
    days: 3,
  },
];

const ChallengeList = () => {
  const navigaion = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="Nutrition Challenges" isHomeScreen={true} />
      <Text style={styles.headerText}>
        Choose your food habits, earn points, and protect the planet!
      </Text>
      <Text style={styles.descriptionText}>
        Each food choice you make impacts the environment. Track your meals and
        help reduce your carbon footprint.
      </Text>
      <FlatList
        data={[...challengesList, ...challengesList, ...challengesList]}
        numColumns={2}
        renderItem={({item, index}) => (
          <NutritionCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            points={item.points}
            days={item.days}
            onPress={() => {
              //@ts-ignore
              navigaion.navigate('VegetarianChallengeScreen');
            }}
            imageSource={require('../../images/icons/turnip_plant.png')}
          />
        )}
      />
    </View>
  );
};

export default ChallengeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
