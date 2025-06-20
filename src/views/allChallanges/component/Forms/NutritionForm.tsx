import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import AddIcon from '../../../../images/icons/add_plus.svg';
import ConsumItemList from './ConsumeItemList';
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import * as yup from 'yup';
import {uploadNutrition} from '../../../../features/nutrition/nutritionThunks';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {
  getFoodItem,
  getMealStyle,
  getMealType,
} from '../../../../features/dropdown/dropdownThunks';
import {ImagePickerService} from '../../../../services/ImagePickerService';
import {FoodItem} from '../../../../features/dropdown/dropdownType';
import {RootStackParamList} from '../../../../navigations/rootStackNavigator';

const mockItems = [
  {name: 'Tofu Stir Fry', points: 18, tag: 'Repeat'},
  {name: 'Quinoa Salad', points: 20},
  {name: 'Paneer Wrap', points: 22, tag: 'High'},
  {name: 'Other Items', points: 0},
];

// Validation schema
const nutritionValidationSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  mealType: yup.string().required('Meal type is required'),
  mealStyle: yup.string().required('Meal style is required'),
  selectedItems: yup.array().min(1, 'At least one item must be selected'),
});

const NutritionForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mealType, setMealType] = useState<number | undefined>();
  const [mealStyle, setMealStyle] = useState<number | undefined>();
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const dispatch = useAppDispatch();
  const foodItems = useAppSelector(state => state.dropdown.foodItem);
  const mealTypes = useAppSelector(state => state.dropdown.mealType);
  const mealStyles = useAppSelector(state => state.dropdown.mealStyle);

  console.log('mealTypes', mealTypes);
  console.log('mealStyles', mealStyles);

  const handleDateChange = (_: any, selected?: Date) => {
    const currentDate = selected || date;
    setShowPicker(false);
    setDate(currentDate);
    if (errors.date) {
      setErrors(prev => ({...prev, date: ''}));
    }
  };

  const handleRemove = (index: number) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
    if (errors.selectedItems && updated.length > 0) {
      setErrors(prev => ({...prev, selectedItems: ''}));
    }
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
          title: 'Add Food Photo',
          message: 'Choose how you want to add your food photo',
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

  // Validation function
  const validateForm = async (): Promise<boolean> => {
    try {
      await nutritionValidationSchema.validate(
        {
          date,
          mealType,
          mealStyle,
          selectedItems,
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
        nutritions: [
          {
            date: date.toISOString(),
            mealType,
            mealStyle,
            item: selectedItems,
            notes: description,
            image: [],
            // image: photoBase64 ? [photoBase64] : [],
          },
        ],
      };

      console.log('Request Body:', requestBody);

      await dispatch(uploadNutrition(requestBody)).unwrap();
      Alert.alert('Success', 'Nutrition data submitted successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('Error submitting nutrition data:', error);
      Alert.alert('Error', error.message || 'Failed to submit nutrition data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMealTypeChange = (value: number) => {
    setMealType(value);
    if (errors.mealType) {
      setErrors(prev => ({...prev, mealType: ''}));
    }
  };

  const handleMealStyleChange = (value: number) => {
    setMealStyle(value);
    if (errors.mealStyle) {
      setErrors(prev => ({...prev, mealStyle: ''}));
    }
  };

  const handleQuantityChange = (text: string, index: number) => {
    const updated = [...selectedItems];
    updated[index] = {
      ...updated[index],
      quantity: parseFloat(text),
    };
    setSelectedItems(updated);
  };

  const renderItem = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.label}</Text>
      <Text style={styles.points}>{item.Points || 0} pts</Text>
      <TextInput
        placeholder="gm"
        style={styles.inputSmall}
        value={item.quantity || ''}
        onChangeText={text => handleQuantityChange(text, index)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => handleRemove(index)}>
        <Text style={styles.remove}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await dispatch(getFoodItem()).unwrap();
      await dispatch(getMealType()).unwrap();
      await dispatch(getMealStyle()).unwrap();
      console.log(response);
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData =
      foodItems.length === 0 ||
      mealTypes.length === 0 ||
      mealStyles.length === 0;

    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (mealTypes.length > 0 && mealStyles.length > 0) {
      setMealType(mealTypes[0].value);
      setMealStyle(mealStyles[0].value);
    }
  }, [mealTypes, mealStyles]);

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
          showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>What did you eat today?</Text>

          {/* Date Picker */}
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={[styles.inputBox, errors.date && styles.inputError]}
            onPress={() => setShowPicker(true)}>
            <Text>{date.toLocaleDateString('en-GB')}</Text>
          </TouchableOpacity>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          {/* Meal Type */}
          <Text style={styles.label}>Select Meal Type</Text>
          <View
            style={[styles.pickerBox, errors.mealType && styles.inputError]}>
            <Picker
              selectedValue={mealType}
              onValueChange={handleMealTypeChange}>
              {mealTypes.map(item => (
                <Picker.Item
                  key={item.dataId}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          {errors.mealType && (
            <Text style={styles.errorText}>{errors.mealType}</Text>
          )}

          {/* Meal Style */}
          <Text style={styles.label}>Choose Meal Style</Text>
          <View
            style={[styles.pickerBox, errors.mealStyle && styles.inputError]}>
            <Picker
              selectedValue={mealStyle}
              onValueChange={handleMealStyleChange}>
              {mealStyles.map(item => (
                <Picker.Item
                  key={item.dataId}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          {errors.mealStyle && (
            <Text style={styles.errorText}>{errors.mealStyle}</Text>
          )}

          {/* Meal Items */}
          <Text style={styles.label}>Select Items Consumed</Text>
          <TouchableOpacity
            style={[styles.inputBox, errors.selectedItems && styles.inputError]}
            onPress={() =>
              navigation.navigate('ConsumItemList', {
                selectedItems,
                onSelect: (items: FoodItem[]) => setSelectedItems(items),
              })
            }>
            <Text>Add items</Text>
            <AddIcon width={20} height={20} fill="#007AFF" />
          </TouchableOpacity>
          {errors.selectedItems && (
            <Text style={styles.errorText}>{errors.selectedItems}</Text>
          )}

          <FlatList
            data={selectedItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />

          {/* Description */}
          <Text style={styles.label}>Add Description</Text>
          <View style={styles.inputWithIcon}>
            <View style={styles.inputWrapperBox}>
              <TextInput
                placeholder="Note (Optional)"
                value={description}
                onChangeText={setDescription}
                style={styles.descriptionInput}
                textAlignVertical="top"
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

          {/* Display photo if taken */}
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

          {/* Submit error */}
          {errors.submit && (
            <Text style={styles.errorText}>{errors.submit}</Text>
          )}

          <CustomButton
            text={isSubmitting ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            disabled={isSubmitting}
            backgroundColor={isSubmitting ? '#cccccc' : '#17a086'}
            style={styles.submitButton}
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
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 16,
    marginTop: 16,
    color: '#333',
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 12,
    color: '#333',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: '#ff4d4d',
    borderWidth: 1,
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputSmall: {
    backgroundColor: '#F0F0F0',
    padding: 4,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
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
    fontSize: 14,
  },
  remove: {
    fontSize: 18,
    color: '#ff4d4d',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    fontStyle: 'italic',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  inputWrapperBox: {
    flex: 1,
  },
  descriptionInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonBox: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  loadingText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
    marginLeft: 4,
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

export default NutritionForm;
