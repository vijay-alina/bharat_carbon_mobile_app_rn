import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../common/button';
import CameraIcon from '../../images/icons/camera_icon.svg';
import {Header} from '../../common/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ImagePickerService} from '../../services/ImagePickerService';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';

import {
  submitMemberThunk,
  updateMemberThunk,
} from '../../features/challenge/addMember/addMemberThunk';
// import { useAppDispatch } from '../../hooks/hooks';

const AddNewMemberScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const {isEdit, member} =
    (route.params as {
      isEdit?: boolean;
      member?: any;
    }) || {};
  const [fullName, setFullName] = useState(member?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(member?.mobileNumber || '');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  // const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [relationship, setRelationship] = useState<string>(
    member?.relationship ?? 'Sibling',
  );

  const {loading} = useSelector((state: RootState) => state.members);

  const handlePickImage = async () => {
    try {
      const result = await ImagePickerService.pickImage(
        {
          quality: 0.8,
          maxHeight: 2000,
          maxWidth: 2000,
          includeBase64: true,
          mediaType: 'photo',
        },
        {
          title: 'Add Member Photo',
          message: 'Choose how you want to add your member photo',
          cameraText: '📷 Take Photo',
          galleryText: '🖼️ Choose from Gallery',
          cancelText: 'Cancel',
        },
      );

      if (result && result.uri) {
        setPhotoUri(result.uri);
        // setPhotoBase64(result.base64);

        console.log('Image selected successfully:', {
          uri: result.uri,
          fileName: result.fileName,
          fileSize: result.fileSize
            ? `${Math.round(result.fileSize / 1024)} KB`
            : 'Unknown',
          base64Size: result.base64
            ? `${Math.round(result.base64.length / 1024)} KB`
            : '0 KB',
        });

        Alert.alert('Success!', 'Photo added successfully.', [{text: 'OK'}]);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.', [
        {text: 'OK'},
      ]);
    }
  };
  // const handleRemovePhoto = async () => {
  //   Alert.alert('remove photo', 'Are you want to remove this photo?', [
  //     { text: 'Cancel', style: 'cancel' },
  //     {
  //       text: 'Remove',
  //       style: 'destructive',
  //       onPress: () => {
  //         setPhotoUri(null);
  //         setPhotoBase64(null);
  //       },
  //     },
  //   ]);
  // };
  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async () => {
    if (!fullName || !phoneNumber || !relationship || !photoUri) {
      Alert.alert('Please fill all fields');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert(
        'Invalid phone number. Please enter a valid 10-digit number.',
      );
      return;
    }

    const payload = {
      fullName,
      mobileNumber: phoneNumber,
      relationship,
    };

    if (isEdit && member?._id) {
      const resultAction = await dispatch(
        updateMemberThunk({familyId: member._id, payload}),
      );
      if (updateMemberThunk.fulfilled.match(resultAction)) {
        Alert.alert('Member updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Failed to update member');
      }
    } else {
      const resultAction = await dispatch(submitMemberThunk(payload));
      if (submitMemberThunk.fulfilled.match(resultAction)) {
        Alert.alert('Member added successfully');
        navigation.goBack();
      } else {
        Alert.alert('Failed to submit member');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title={isEdit ? 'Edit Member' : 'Add New Member'}
        onBackClick={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#17a086" style={styles.loader} />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handlePickImage}
            style={styles.avatarContainer}>
            {/* <Image
            source={
              { uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }
            }
            style={styles.avatar}
          /> */}
            <Image
              source={
                photoUri
                  ? {uri: photoUri}
                  : member?.image
                  ? {uri: member.image}
                  : {
                      uri: 'https://avatar.iran.liara.run/public/boy?username=Ash',
                    }
              }
              style={styles.avatar}
            />

            <View style={styles.editIcon}>
              <CameraIcon />
            </View>
          </TouchableOpacity>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={text => {
              // Remove all non-numeric characters
              const cleaned = text.replace(/[^0-9]/g, '');

              // Limit to 10 digits
              if (cleaned.length <= 10) {
                setPhoneNumber(cleaned);
              }
            }}
            maxLength={10} // Also add this for extra safety
            placeholder="78122 45690"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Relationship</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={relationship}
              onValueChange={value => setRelationship(value)}>
              <Picker.Item label="Sibling" value="Sibling" />
              <Picker.Item label="Parent" value="Parent" />
              <Picker.Item label="Child" value="Child" />
              <Picker.Item label="Friend" value="Friend" />
            </Picker>
          </View>

          {/* <CustomButton
          text={'Send Invite'}
          onPress={() => { }}
          showIcon={!isSubmitting}
          iconName="arrow-forward"
          backgroundColor="#17a086"
          style={styles.submitButton}
        /> */}
          {/* <CustomButton
            text={
              loading
                ? 'Submitting...'
                : isEdit
                ? 'Update Member'
                : 'Add Member'
            }
            onPress={handleSubmit}
            disabled={loading}
            backgroundColor="#17a086"
            style={styles.submitButton}
          /> */}
          <CustomButton
            text={
              loading
                ? 'Submitting...'
                : isEdit
                ? 'Update Profile'
                : 'Add Member'
            }
            onPress={handleSubmit}
            disabled={loading}
            backgroundColor="#17a086"
            style={styles.submitButton}
            // iconComponent={AddPlusCircle}
            // showIcon={true}
            // isLeftIcon={true}
          />
        </View>
      )}
    </View>
  );
};

export default AddNewMemberScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editIcon: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    // backgroundColor: '#00C897',
    // borderRadius: 10,
    padding: 4,
  },
  label: {
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 32,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#00C897',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
