import {StyleSheet, Text, View} from 'react-native';
import GradientChallengeCard from './components/challengeCard';
import {Header} from '../../common/header';
import { getLineHeight } from '../../utils/utils';

export const ChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Challenges" />
      <Text style={styles.title}>Choose Your Challenge Category</Text>
      <Text style={styles.description}>Pick an area of your life to reduce carbon impact and earn points!</Text>
      <GradientChallengeCard
        pointsText="Earn up to 30 points/week"
        imageUri="https://your-image-link.png"
        title="Housing Challenges"
        description="Save water, energy, and reduce home waste."
        keywords="Energy Saving, Waste Reduction"
      />
      <GradientChallengeCard
        pointsText="Earn up to 30 points/week"
        imageUri="https://your-image-link.png"
        title="Housing Challenges"
        description="Save water, energy, and reduce home waste."
        keywords="Energy Saving, Waste Reduction"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
});
