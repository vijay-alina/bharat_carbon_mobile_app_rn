import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import {Colors} from '../../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import * as yup from 'yup';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg';
import {ImagePickerService} from '../../../../services/ImagePickerService';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {uploadLesiure} from '../../../../features/leisure/leisureThunks';
import {getLeisureActivity} from '../../../../features/dropdown/dropdownThunks';

type RootStackParamList = {
  MobilityForm: undefined;
  ConsumItemList: undefined;
};

const LeisureValidationSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  people: yup.string().required('People is required'),
  amount: yup.string().required('Amount is required'),
});

const LeisureForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [leisureActivity, setLeisureActivity] = useState<any>();
  const [people, setPeople] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const dispatch = useAppDispatch();

  const leisureActivities = useAppSelector(
    state => state.dropdown.leisureActivity,
  );

  const handleDateChange = (_: any, selected?: Date) => {
    const currentDate = selected || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  // Handle image selection using the service
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
      await LeisureValidationSchema.validate(
        {
          date,
          people,
          amount,
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
        leisures: [
          {
            date: date.toISOString(),
            leisureActivity: leisureActivity,
            people: parseInt(people),
            amount: parseFloat(amount),
            unit: 'INR',
            notes,
            image: [],
            // image: photoBase64 ? [photoBase64] : [],
          },
        ],
      };

      console.log('Request Body:', requestBody);

      // Replace with your actual housing API call
      await dispatch(uploadLesiure(requestBody)).unwrap();

      Alert.alert('Success', 'Leisure data submitted successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Error submitting housing data:', error);
      Alert.alert('Error', error.message || 'Failed to submit leisure data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await dispatch(getLeisureActivity()).unwrap();
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData = leisureActivities.length === 0;

    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (leisureActivities.length > 0) {
      setLeisureActivity(leisureActivities[0]);
    }
  }, [leisureActivities]);

  console.log('Leisure Activity:', leisureActivities);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      {dataLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#23B397" />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic">
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
              maximumDate={new Date()}
            />
          )}
          <Text style={styles.label}>Activity Name</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={leisureActivity}
              onValueChange={setLeisureActivity}>
              {leisureActivities?.map(item => (
                <Picker.Item
                  key={item.dataId}
                  label={item.label}
                  value={item}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>No of people involved</Text>
          <TextInput
            placeholder="No of people involved"
            value={people}
            onChangeText={setPeople}
            keyboardType="numeric"
            style={[styles.inputBox, errors.people && styles.inputError]}
          />
          {errors.people && (
            <Text style={styles.errorText}>{errors.people}</Text>
          )}
          <Text style={styles.label}>Amount spent (INR)</Text>
          <TextInput
            placeholder={'Amount spent (INR)'}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={[styles.inputBox, errors.amount && styles.inputError]}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}

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
            <Text style={styles.cardHeading}>Did you know?</Text>
            <Text style={styles.cardPoints}>
              Swapping screen time for outdoor time reduces energy use & boosts
              your health!{' '}
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
  label: {
    marginBottom: 4,
    marginTop: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.Black3,
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
  note: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
  checkboxContainer: {
    marginTop: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#17a086',
    borderColor: '#17a086',
  },
  checkboxLabel: {
    fontSize: 14,
    color: Colors.Black3,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 8,
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

export default LeisureForm;
