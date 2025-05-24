// components/FamilyMemberCard.tsx
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import avatarPlaceholder from '../../../images/icons/avatar_placeholder.png';
import dividerImage from '../../../images/icons/divider.png';

import PointsComponent from './PointsComponent';
import {Colors} from '../../../constants/colors';
import Co2ValueComponent from './Co2ValueComponent';
import StatusComponent, {Status} from './StatusComponent';

interface FamilyMemberCardProps {
  name: string;
  relation: string;
  points: number;
  co2Value: string;
  co2Status: string;
  avatar?: any; // image source
}

const getStatus = (status: string) => {
    let statusEnum: Status = Status.NORMAL;
  switch (status) {
    case 'High':
        statusEnum = Status.HIGH;
        break;
    case 'Very High':
        statusEnum = Status.VERY_HIGH;
        break;
    case 'Normal':
        statusEnum = Status.NORMAL;
        break;
  }
  return statusEnum;
};

const FamilyMemberCard = ({
  name,
  relation,
  points,
  co2Value,
  co2Status,
  avatar,
}: FamilyMemberCardProps) => {
  const avatarUri = avatar ? {uri: avatar} : avatarPlaceholder;
  return (
    <View style={styles.card}>
      <Image source={avatarUri} style={styles.avatar} />
      <View style={styles.pointsContainer}>
        <PointsComponent points={points} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.relation}>{relation}</Text>
      <Image source={dividerImage} style={styles.divider} />
      <Co2ValueComponent co2Value={co2Value} />
      <StatusComponent status={getStatus(co2Status)} />
    </View>
  );
};

export default FamilyMemberCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  pointsContainer: {
    marginTop: -10,
  },
  divider: {
    width: 155,
    height: 1,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.ThickGreenShades,
    marginTop: 8,
  },
  relation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: Colors.NeutralsDark,
    marginBottom: 8,
    marginTop: 8,
  },
  co2Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  co2Label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: Colors.NeutralsDark,
  },
  co2ValueContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: Colors.PrimaryBlue,
    borderRadius: 20,
  },
  co2Value: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.White,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
