import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../../common/button'; 
import { Colors } from '../../../constants/colors';
import CoinIcon from '../../../images/icons/phonepe-icon.png'; // Replace with your actual coin icon image path

type ChallengeCardProps = {
  title: string;
  description: string;
  reward: string | number;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, reward }) => {
  const handlePress = () => {
    console.log(`${title} Pressed!`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>

      <View style={styles.rewardContainer}>
        <Text style={styles.rewardText}>Reward:</Text>
        <Image source={CoinIcon} style={styles.coinIcon} />
        <Text style={styles.rewardText}>{reward}</Text>
      </View>

      <CustomButton
        text="Get Started"
        onPress={handlePress}
        backgroundColor={Colors.GreenNormal}
        textColor="#fff"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.White, // Replace with actual background color if defined
    borderRadius: 16,
    padding: 20,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: Colors.GreenNormal,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: Colors.GreenNormal,
    marginBottom: 12,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  coinIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    marginLeft: 6,
  },
  rewardText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.GreenNormal,
  },
  button: {
    marginTop: 10,
  },
});

export default ChallengeCard;
