import React, {useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getMemberByIdThunk,
  deleteMemberThunk,
} from '../../features/challenge/addMember/addMemberThunk';
import {useAppDispatch} from '../../hooks/hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAppContext} from '../../context/AppContext';

const MemberProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = useAppContext();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const {memberId} = route.params as {memberId: string};
  const {selectedMember} = useSelector((state: RootState) => state.members);

  useEffect(() => {
    if (memberId) {
      dispatch(getMemberByIdThunk(memberId));
    }
  }, [dispatch, memberId]);

  const handleUpdate = () => {
    if (!selectedMember) return;
    // @ts-ignore
    navigation.navigate('AddNewMemberScreen', {
      isEdit: true,
      member: selectedMember,
    });
  };

  const bulletPoints = [
    'Delete her points and challenge history from the family group',
    'Remove her from the shared CO₂ impact dashboard',
  ];

  const handleDelete = () => {
    bottomSheetRef.current?.expand();
  };

  const confirmDelete = () => {
    if (!selectedMember) return;

    bottomSheetRef.current?.close();

    dispatch(deleteMemberThunk(selectedMember._id))
      .unwrap()
      .then(() => {
        Alert.alert(
          'Member Removed',
          `${selectedMember.fullName} has been successfully removed.`,
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Something went wrong while trying to remove the member.',
        );
      });
  };

  return (
    <View style={styles.container}>
      <Header title="View Profile" onBackClick={() => navigation.goBack()} />
      <ProfileSection />

      <View style={styles.wrapper}>
        <StatusComponent
          badgeText="10.5 KG"
          badgeColor={Colors.PrimaryBlue}
          renderStatus={() => (
            <View style={styles.row}>
              <Text style={{fontSize: 18, color: '#0F3555'}}>CO2</Text>
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
              <Text style={styles.statusText}>Status</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.infoContainer}>
        <ChallangeInfoItem title="Completed Challenges" value="5" />
        <ChallangeInfoItem title="Active Challenges" value="1" />
        <ChallangeInfoItem title="Last Activity" value="2 Days ago" />
      </View>

      <View style={styles.challengeHistoryContainer}>
        <Text style={styles.labelText}>Challenge History</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ChallengeHistoryItem />

      {user.type === 'student' && (
        <View style={styles.buttonContainer}>
          <View style={styles.editButtonContainer}>
            <CustomButton
              text="Edit Profile"
              onPress={handleUpdate}
              style={styles.addButton}
              iconComponent={EditPencilIcon}
              showIcon={true}
              isLeftIcon={false} // Icon on right
            />
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <TrashIcon />
          </TouchableOpacity>
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{borderRadius: 20}}>
        <View style={{padding: 20, flex: 1}}>
          <Text style={styles.modalTitle}>
            Are you sure you want to remove this member?
          </Text>
          <Text style={styles.modalText}>
            Removing <Text>{selectedMember?.fullName ?? 'this member'}</Text>{' '}
            will.
          </Text>
          <View style={styles.bulletPoints}>
            {bulletPoints.map((point, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={[
                styles.modalButton,
                {backgroundColor: Colors.Neutrals100},
              ]}>
              <Text style={styles.modalCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmDelete}
              style={[styles.modalButton, {backgroundColor: Colors.RedNormal}]}>
              <Text style={styles.modalRemoveButton}>Remove Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  row: {flexDirection: 'row', alignItems: 'flex-end'},
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
  co2Text: {fontSize: 16, color: '#134771'},
  co2Sub: {fontSize: 12, color: '#134771', marginBottom: -3},
  statusText: {fontSize: 18, color: '#134771'},
  verticalDivider: {width: 2, height: '100%'},
  infoContainer: {marginTop: 10, marginHorizontal: 16},
  challengeHistoryContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.PrimaryBlue,
  },
  viewAllText: {
    fontSize: 14,
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
  editButtonContainer: {width: '75%'},
  deleteButton: {
    backgroundColor: Colors.RedNormal,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '22%',
    borderRadius: 40,
    marginLeft: 10,
  },
  addButton: {
    width: '100%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  bulletPoints: {marginTop: 1},
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletDot: {fontSize: 16, lineHeight: 22, marginRight: 8},
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 22,
    fontWeight: '600',
    opacity: 0.6,
  },
  modalButtons: {
    flexDirection: 'column',
    marginTop: 'auto',
    gap: 10,
  },
  modalButton: {
    width: '100%',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  modalRemoveButton: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalCancelButton: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MemberProfileScreen;
