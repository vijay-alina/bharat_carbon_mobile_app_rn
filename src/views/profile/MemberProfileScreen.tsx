/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Colors} from '../../constants/colors';
import ProfileSection from './components/ProfileSection';
import StatusComponent from './components/StatusComponent';
import VerticalDivider from '../../images/icons/vertical_divider.png';
import ChallangeInfoItem from './components/ChallengeInfoItem';
import ChallengeHistoryItem from './components/ChallengeHistoryItem';
import {Header} from '../../common/header';
import CustomButton from '../../common/button';
import {DEVICE_WIDTH} from '../../utils/utils';
import {EditPencilIcon, TrashIcon} from '../../images/icons';
import {useNavigation} from '@react-navigation/native';

const MemberProfileScreen = () => {
  const navigation = useNavigation();

  const handleAddMemberClick = () => {
    //@ts-ignore
    navigation.navigate('AddNewMemberScreen');
  };

  return (
    <View style={styles.container}>
      <Header title="View Profile" onBackClick={() => navigation.goBack()} />
      <ProfileSection />
      <View style={styles.wrapper}>
        <StatusComponent
          badgeText="10.5 KG"
          badgeColor={Colors.Black}
          renderStatus={() => (
            <View style={styles.row}>
              <Text style={{fontSize: 18, color: '#0F3555'}}>CO</Text>
              <Text style={{fontSize: 12, color: '#0F3555', marginBottom: -3}}>
                2
              </Text>
              <Text style={{fontSize: 18, color: '#0F3555'}}>e (2025)</Text>
            </View>
          )}
        />
        <Image source={VerticalDivider} style={styles.verticalDivider} />
        <StatusComponent
          badgeColor={Colors.GreenNormal}
          showDot={true}
          badgeText="Normal"
          renderStatus={() => (
            <View style={styles.row}>
              <Text style={{fontSize: 18, color: '#0F3555'}}>Status</Text>
            </View>
          )}
        />
      </View>

      <View style={{marginTop: 10, marginHorizontal: 16}}>
        <ChallangeInfoItem title="Completed Challanges" value="5" />
        <ChallangeInfoItem title="Active Challanges" value="1" />
        <ChallangeInfoItem title="Last Activity" value="2 Days ago" />
      </View>
      <View style={styles.challengeHistoryContainer}>
        <Text style={styles.labelText}>Challenge History</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ChallengeHistoryItem />
      <View style={styles.buttonContainer}>
        <View style={styles.editButtonContaienr}>
          <CustomButton
            text="Edit Profile"
            onPress={handleAddMemberClick}
            style={styles.addButton}
            iconComponent={EditPencilIcon}
            showIcon={true}
            isLeftIcon={true}
          />
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  wrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginHorizontal: 16,
  },
  verticalDivider: {
    width: 2,
    height: '100%',
  },
  challengeHistoryContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
    color: Colors.PrimaryBlue,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '700',
    color: Colors.ThickGreenShades700,
  },
  buttonContainer: {
    width: DEVICE_WIDTH * 0.9,
    position: 'absolute',
    bottom: 10,
    left: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButtonContaienr: {
    width: '75%',
  },
  deleteButton: {
    backgroundColor: Colors.RedDark,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '25%',
    borderRadius: 24,
    marginLeft: 10,
  },
  addButton: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default MemberProfileScreen;
