import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import {Colors} from '../../../../constants/colors';
import * as yup from 'yup';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg';
import CheckBoxIcon from '../../../../images/icons/checkbox.svg';
import UncheckedCheckBoxIcon from '../../../../images/icons/checkbox_uncheck.svg';
import {ImagePickerService} from '../../../../services/ImagePickerService';
import {useAppDispatch} from '../../../../hooks/hooks';
import {uploadHousingData} from '../../../../features/housingData/housingDataThunks';
import {Image} from 'react-native-svg';

type RootStackParamList = {
  MobilityForm: undefined;
  ConsumItemList: undefined;
};

const HousingForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  // Initialize with current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Set initial date to first day of current month of current year
  const [date, setDate] = useState(
    new Date(currentYear, currentDate.getMonth(), 1),
  );
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState('Electricity');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [isSolarInstalled, setIsSolarInstalled] = useState(false);
  const [solarUnits, setSolarUnits] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get month and year as numbers
  const selectedMonth = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
  const selectedYear = date.getFullYear();

  // Get month name for display
  const getMonthName = (monthNumber: number) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber - 1];
  };

  const handleDateChange = (_: any, selected?: Date) => {
    setShowPicker(false);
    if (selected) {
      // Ensure the selected date is within the current year
      const selectedYear = selected.getFullYear();
      if (selectedYear === currentYear) {
        // Set to first day of selected month to focus on month selection
        const newDate = new Date(currentYear, selected.getMonth(), 1);
        setDate(newDate);

        // Log the selected month and year as numbers
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        console.log('Selected Month (number):', month);
        console.log('Selected Year (number):', year);
      } else {
        // If user tries to select different year, reset to current year
        Alert.alert(
          'Invalid Selection',
          `Please select a month from ${currentYear} only.`,
        );
        const resetDate = new Date(currentYear, currentDate.getMonth(), 1);
        setDate(resetDate);
      }
    }
  };

  const HousingDataValidationSchema = yup.object().shape({
    date: yup.date().required('Date is required'),
    unitsConsumed: yup
      .number()
      .positive('Units consumed must be a positive number')
      .required('Units consumed is required'),
    description: yup.string().optional(),
    isSolarInstalled: yup
      .boolean()
      .required('Solar installation status is required'),
    solarUnits: yup.number().when('isSolarInstalled', {
      is: true,
      then: schema =>
        schema
          .positive('Solar units must be a positive number')
          .required('Solar units are required when solar panel is installed'),
      otherwise: schema => schema.optional(),
    }),
  });

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
      await HousingDataValidationSchema.validate(
        {
          date,
          unitsConsumed: parseFloat(unitsConsumed) || 0,
          description,
          isSolarInstalled,
          solarUnits: isSolarInstalled
            ? parseFloat(solarUnits) || 0
            : undefined,
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
        electricities: [
          {
            month: selectedMonth, // Month as number (1-12)
            year: selectedYear, // Current year as number
            consumption: parseFloat(unitsConsumed),
            notes: description,
            unit: 'kWh',
            isSolarInstalled: isSolarInstalled,
            electricityGenerationUnit: isSolarInstalled ? 'kWh' : undefined,
            electricityGeneration: isSolarInstalled
              ? parseFloat(solarUnits)
              : undefined,
            image: [],
            // image: photoBase64 ? [photoBase64] : [],
          },
        ],
      };

      console.log('Request Body:', requestBody);

      // Replace with your actual housing API call
      await dispatch(uploadHousingData(requestBody)).unwrap();

      Alert.alert('Success', 'Housing data submitted successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Error submitting housing data:', error);
      Alert.alert('Error', error.message || 'Failed to submit housing data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.label}>Choose Usage Category</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            <Picker.Item label="Electricity" value="Electricity" />
            <Picker.Item label="Fuel" value="Fuel" />
            <Picker.Item label="Water" value="Water" />
            <Picker.Item label="Waste" value="Waste" />
            <Picker.Item label="Appliances" value="Appliances" />
          </Picker>
        </View>

        <Text style={styles.label}>Select Month ({currentYear})</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>
            {getMonthName(selectedMonth)} {selectedYear}
          </Text>
          <CalenderIcon width={24} height={24} />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date(currentYear, 0, 1)} // January 1st of current year
            maximumDate={new Date(currentYear, 11, 31)} // December 31st of current year
          />
        )}

        <Text style={styles.label}>Units Consumed (kWh)</Text>
        <TextInput
          placeholder="Enter total units"
          value={unitsConsumed}
          onChangeText={setUnitsConsumed}
          keyboardType="numeric"
          style={[styles.inputBox, errors.unitsConsumed && styles.inputError]}
        />
        {errors.unitsConsumed && (
          <Text style={styles.errorText}>{errors.unitsConsumed}</Text>
        )}

        <Text style={styles.label}>Add Description</Text>
        <View style={styles.inputWithIcon}>
          <View style={styles.inputWrapperBox}>
            <TextInput
              placeholder="Note (Optional)"
              value={description}
              onChangeText={setDescription}
              style={styles.inputBox}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={handleImagePicker}>
            <GalleryaddIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>Earn 10 points by uploading a picture!</Text>

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

        {/* Installed Solar Panel Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsSolarInstalled(!isSolarInstalled)}>
            {isSolarInstalled ? (
              <CheckBoxIcon width={24} height={24} />
            ) : (
              <UncheckedCheckBoxIcon width={24} height={24} />
            )}
            <Text style={styles.checkboxLabel}>Installed Solar Panel?</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Input */}
        {isSolarInstalled && (
          <>
            <Text style={styles.label}>Solar Units Consumed (kWh)</Text>
            <TextInput
              placeholder="Solar Electricity Consumption"
              value={solarUnits}
              onChangeText={setSolarUnits}
              keyboardType="numeric"
              style={[styles.inputBox, errors.solarUnits && styles.inputError]}
            />
            {errors.solarUnits && (
              <Text style={styles.errorText}>{errors.solarUnits}</Text>
            )}
          </>
        )}

        <CustomButton
          text={isSubmitting ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
          backgroundColor="#17a086"
          style={styles.submitButton}
          disabled={isSubmitting}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
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
  dateText: {
    fontSize: 16,
    color: Colors.Black3,
    fontFamily: 'Montserrat-Regular',
  },
  selectedDateInfo: {
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#2E7D32',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
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

export default HousingForm;
