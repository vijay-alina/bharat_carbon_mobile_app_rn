import { Text, TouchableOpacity, View } from 'react-native';
import { BackIcon } from '../../images/icons';
import GradientChallengeCard from './components/challengeCard';

export const ChallengeScreen = () => {

  const toggleDrawer = () => {
    //   navigation.toggleDrawer();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <BackIcon />
      </TouchableOpacity>
      <Text>History Screen</Text>
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
