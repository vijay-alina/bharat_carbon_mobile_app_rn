import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import CustomButton from '../../../common/button';
import {Colors} from '../../../constants/colors';
import StarIcon from '../../../images/icons/star_icon.png'; // Replace with your actual coin icon image path
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../hooks/hooks';
import {challengeAccept} from '../../../features/manageChallege/manageChallengeThunks';

type ChallengeCardProps = {
  title: string;
  description: string;
  reward: string | number;
  days: number;
  point: number;
  challengeData: any;
  openModal: any;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  reward,
  days,
  point,
  challengeData,
  openModal,
}) => {

  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getUTCDate() + days);

  const formatUTC = (date: Date) => date.toISOString().replace('Z', '+00:00');

  const handlePress = () => {
    const payload = {
      startDate: formatUTC(startDate),
      endDate: formatUTC(endDate),
      days,
      point,
      challangeType: challengeData?.subChallangeType,
    };

    openModal(payload);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>

      <View style={styles.rewardContainer}>
        <Text style={styles.rewardText}>Reward:</Text>
        <Image source={StarIcon} style={styles.coinIcon} />
        <Text style={styles.rewardText}>{reward}</Text>
      </View>

      <CustomButton
        text="Get Started"
        onPress={handlePress}
        backgroundColor={Colors.ThickGreenShades700}
        textColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    padding: 14,
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.Black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
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
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.Black,
  },
  button: {
    marginTop: 10,
  },
});

export default ChallengeCard;
