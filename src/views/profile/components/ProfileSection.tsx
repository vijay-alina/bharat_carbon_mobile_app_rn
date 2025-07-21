import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ProfileImage from '../../../images/icons/avatar_placeholder.png';
// import PointsComponent from "../../addMember/components/PointsComponent"
import {useSelector} from 'react-redux';
// import { RootState } from '../../../redux/store'; // <-- correct this path
// import { Colors } from '../../constants/colors'; // corrected path for Colors
import {RootState} from '../../../app/store';
import {Colors} from '../../../constants/colors';
import PointsComponent from '../../addMember/components/PointsComponent';
const ProfileSection = () => {
  const member = useSelector(
    (state: RootState) => state.members.selectedMember,
  );

  return (
    <View style={styles.container}>
      <Image source={ProfileImage} style={styles.image} resizeMode="contain" />
      <View style={styles.pointsContainer}>
        <PointsComponent points={'12 point'} />
      </View>
      <Text style={styles.memberNameText}>{member?.fullName || 'Name'}</Text>
      <Text style={styles.memberRelationText}>
        {member?.relationship || 'Relationship'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  pointsContainer: {
    position: 'absolute',
    top: 90,
  },
  memberNameText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    marginTop: 22,
  },
  memberRelationText: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.MediumGrey,
  },
});

export default ProfileSection;
