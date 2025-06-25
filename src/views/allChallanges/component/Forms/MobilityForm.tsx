import React, {use, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import {Colors} from '../../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import {ScrollView} from 'react-native';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg';
import MapIcon from '../../../../images/icons/Map_Pin.svg';
import * as yup from 'yup';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {ImagePickerService} from '../../../../services/ImagePickerService';
import {
  getTravelMode,
  getTripType,
} from '../../../../features/dropdown/dropdownThunks';
import {uploadMobility} from '../../../../features/mobility/mobilityThunks';

type RootStackParamList = {
  MobilityForm: undefined;
  ConsumItemList: undefined;
};

const MobilityValidationSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  travelledFrom: yup.string().required('Start Date is required'),
  travelledTo: yup.string().required('End Date is required'),
  distanceTravelled: yup.string().required('End Date is required'),
});

const MobilityForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [transportMode, setTransportMode] = useState<number | undefined>();
  const [tripType, setTripType] = useState<number | undefined>();
  const [travelledFrom, setTravelledFrom] = useState<string>('');
  const [travelledTo, setTravelledTo] = useState<string>('');
  const [distanceTravelled, setDistanceTravelled] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const dispatch = useAppDispatch();

  const travelModes = useAppSelector(state => state.dropdown.travelMode);
  const tripTypes = useAppSelector(state => state.dropdown.tripType);

  const handleDateChange = (_: any, selected?: Date) => {
    const currentDate = selected || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleImagePicker = async () => {
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
          title: 'Add Housing Photo',
          message: 'Choose how you want to add your housing photo',
          cameraText: '📷 Take Photo',
          galleryText: '🖼️ Choose from Gallery',
          cancelText: 'Cancel',
        },
      );

      if (result && result.uri) {
        setPhotoUri(result.uri);
        setPhotoBase64(result.base64);

        Alert.alert(
          'Success!',
          'Photo added successfully! You earned 10 points.',
          [{text: 'OK'}],
        );
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.', [
        {text: 'OK'},
      ]);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setPhotoUri(null);
          setPhotoBase64(null);
        },
      },
    ]);
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await MobilityValidationSchema.validate(
        {
          date,
          travelledFrom,
          travelledTo,
          distanceTravelled,
        },
        {abortEarly: false},
      );
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: {[key: string]: string} = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Submit function
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const isValid = await validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      const requestBody = {
        mobilities: [
          {
            date: date.toISOString(),
            transportMode,
            tripType,
            travelledFrom,
            travelledTo,
            distanceTravelled: parseFloat(distanceTravelled),
            notes,
            image: [],
            // image: photoBase64 ? [photoBase64] : [],
          },
        ],
      };

      // Replace with your actual housing API call
      await dispatch(uploadMobility(requestBody)).unwrap();

      Alert.alert('Success', 'mobility data submitted successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Error submitting housing data:', error);
      Alert.alert('Error', error.message || 'Failed to submit mobility data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await dispatch(getTravelMode()).unwrap();
      await dispatch(getTripType()).unwrap();
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData = travelModes.length === 0 || tripTypes.length === 0;

    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (travelModes.length > 0 && tripTypes.length > 0) {
      setTransportMode(travelModes[0].value);
      setTripType(tripTypes[0].value);
    }
  }, [travelModes, tripTypes]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      {dataLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.header}>Track Your Mobility</Text>

          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}>
            <Text>{date.toLocaleDateString('en-GB')}</Text>
            <CalenderIcon width={24} height={24} />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>How Did You Travel?</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={transportMode}
              onValueChange={setTransportMode}>
              {travelModes.map(item => (
                <Picker.Item
                  key={item.dataId}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Trip Type</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={tripType} onValueChange={setTripType}>
              {tripTypes.map(item => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.locationBox}>
              <Text style={styles.label}>Start Location</Text>
              <View style={styles.inputWithLocationIcon}>
                <TextInput
                  placeholder="Add location"
                  style={[
                    styles.inputBox,
                    errors.travelledFrom && styles.inputError,
                  ]}
                  value={travelledFrom}
                  onChangeText={setTravelledFrom}
                />
                <MapIcon width={20} height={20} />
              </View>
              {errors.travelledFrom && (
                <Text style={styles.errorText}>{errors.travelledFrom}</Text>
              )}
            </View>

            <View style={styles.locationBox}>
              <Text style={styles.label}>End Location</Text>
              <View style={styles.inputWithLocationIcon}>
                <TextInput
                  placeholder="Add location"
                  style={[
                    styles.inputBox,
                    errors.travelledTo && styles.inputError,
                  ]}
                  value={travelledTo}
                  onChangeText={setTravelledTo}
                />
                <MapIcon width={20} height={20} />
              </View>
              {errors.travelledTo && (
                <Text style={styles.errorText}>{errors.travelledTo}</Text>
              )}
            </View>
          </View>

          <Text style={styles.label}>Distance Traveled (Km)</Text>
          <TextInput
            placeholder="Enter Distance in Kilometers"
            value={distanceTravelled}
            onChangeText={setDistanceTravelled}
            style={[
              styles.inputBox,
              errors.distanceTravelled && styles.inputError,
            ]}
          />
          {errors.distanceTravelled && (
            <Text style={styles.errorText}>{errors.distanceTravelled}</Text>
          )}
          {/* Description */}
          <Text style={styles.label}>Add Description</Text>
          <View style={styles.inputWithIcon}>
            <View style={styles.inputWrapperBox}>
              <TextInput
                placeholder="Note (Optional)"
                value={notes}
                onChangeText={setNotes}
                style={styles.inputBox}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonBox}
              onPress={handleImagePicker}>
              <GalleryaddIcon width={24} height={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            Earn 10 points by uploading a picture!
          </Text>

          {photoUri && (
            <View style={styles.photoContainer}>
              <View style={styles.photoHeader}>
                <Text style={styles.photoText}>Photo added successfully!</Text>
                <TouchableOpacity
                  onPress={handleRemovePhoto}
                  style={styles.removePhotoButton}>
                  <Text style={styles.removePhotoText}>Remove</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.photoSubText}>
                Base64 size:{' '}
                {photoBase64 ? Math.round(photoBase64.length / 1024) : 0} KB
              </Text>
              <Text style={styles.photoSubText}>
                File size: {photoUri ? 'Image loaded' : 'No image'}
              </Text>
            </View>
          )}

          <View style={styles.instructionsCard}>
            <Text style={styles.cardHeading}>Want to earn more points?</Text>
            <Text style={styles.cardPoints}>
              . Try cycling to short distance
            </Text>
            <Text style={styles.cardPoints}>
              . Opt for public transport for busy route
            </Text>
            <Text style={styles.cardPoints}>
              . Share rides whenever possible
            </Text>
          </View>

          <CustomButton
            text={isSubmitting ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            backgroundColor="#17a086"
            style={styles.submitButton}
            disabled={isSubmitting}
          />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
  },
  container: {
    backgroundColor: '#F4F6FA',
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.Black2,
  },
  label: {
    marginBottom: 4,
    marginTop: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.Black3,
  },
  smallLabel: {
    fontWeight: '500',
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#ff4d4d',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Montserrat-Regular',
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputSmall: {
    backgroundColor: '#F0F0F0',
    padding: 4,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {flex: 1},
  tag: {
    backgroundColor: '#E6F0FF',
    color: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    fontSize: 12,
  },
  points: {
    marginRight: 6,
    fontWeight: '600',
    color: '#009966',
  },
  remove: {
    fontSize: 18,
    color: '#ff4d4d',
    marginLeft: 8,
  },
  note: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  submitBtn: {
    backgroundColor: '#00B386',
    padding: 14,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 16,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  inputWrapperBox: {
    width: '87%',
  },
  buttonBox: {
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  locationBox: {
    flex: 1,
    marginTop: 8,
  },
  instructionsCard: {
    backgroundColor: Colors.LightGreenShades100,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  cardHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.BlueShades300,
  },
  cardPoints: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.BlueShades300,
    marginTop: 4,
  },
  inputWithLocationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  photoContainer: {
    backgroundColor: '#E6F7FF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#B3E5FC',
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  photoText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  removePhotoButton: {
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  removePhotoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  photoSubText: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});

export default MobilityForm;
