import {ScrollView, StyleSheet, Text, View} from 'react-native';
import GradientChallengeCard from './components/challengeCard';
import {Header} from '../../common/header';
import {getLineHeight} from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';

export const ChallengeScreen = () => {
  const navigation = useNavigation();

  const handleOnClick = () => {
    //@ts-ignore
    navigation.navigate('ChallengeList');
  };

  return (
    <View style={styles.container}>
      <Header title="Challenges" isHomeScreen={true} onBackClick={() => navigation.goBack()} />
      <Text style={styles.title}>Choose Your Challenge Category</Text>
      <Text style={styles.description}>
        Pick an area of your life to reduce carbon impact and earn points!
      </Text>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <GradientChallengeCard
          pointsText="Earn up to"
          offerType="30 points/week"
          imageUri={require('../../images/icons/tap_icon.png')}
          title="Housing Challenges"
          description="Save water, energy, and reduce home waste."
          keywords="Energy Saving, Waste Reduction"
          onPress={handleOnClick}
        />
        <GradientChallengeCard
          pointsText="Earn up to"
          offerType="30 points/trip"
          imageUri={require('../../images/icons/boy_with_bicycle.png')}
          title="Mobility Challenges"
          description="Choose eco-friendly ways to travel."
          keywords="Walk, Cycle, Public Transport, EV"
          onPress={handleOnClick}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: getLineHeight(16, 120),
    padding: 16,
    alignSelf: 'flex-start',
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: getLineHeight(12, 120),
    paddingLeft: 16,
    paddingBottom: 12,
    alignSelf: 'flex-start',
  },
  contentContainerStyle: {
    // flex: 1,
  },
});
