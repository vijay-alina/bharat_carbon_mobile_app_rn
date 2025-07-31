import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import ConsumItemList from './ConsumeItemList';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg';
import {Colors} from '../../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {
  fetchGoodsType,
  uploadGoods,
} from '../../../../features/challenge/goods/goodsThunk';
import {TGoodsType} from '../../../../features/challenge/types';
import * as yup from 'yup';
import {
  getClothes,
  getGoodsDetailsById,
  goodsUpdate,
} from '../../../../services/challengeService';
import {fetchClothes} from '../../../../features/challenge/cloths/clothsThunk';
import {fetchAppliances} from '../../../../features/challenge/appliance/appliancesThunk';
import {ImagePickerService} from '../../../../services/ImagePickerService';

const mockItems = [
  {name: 'Tofu Stir Fry', points: 18, tag: 'Repeat'},
  {name: 'Quinoa Salad', points: 20},
  {name: 'Paneer Wrap', points: 22, tag: 'High'},
  {name: 'Other Items', points: 0},
];

type RootStackParamList = {
  NutritionForm: undefined;
  ConsumItemList: undefined;
};

const goodsValidationSchema = yup.object().shape({
  date: yup.date().required('date is required'),
  goodsType: yup.string().required('Select goods type'),
  amount: yup.string().required('Enter the amount u have spent'),
  selectedItems: yup.array().min(1, 'At least one item must be selected'),
});

type GoodsFormProps = {
  activityId?: string; // mark as optional if needed
};

const GoodsForm: React.FC<GoodsFormProps> = ({activityId}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [goodsType, setGoodsType] = useState<number | undefined>();
  const [applianceType, setApplianceType] = useState<number | undefined>();
  const [selectedItems, setSelectedItems] = useState<any>();
  const [clothsType, setClothsType] = useState<number | undefined>();
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {goods} = useAppSelector(state => state.goods);
  const {cloths} = useAppSelector(state => state.cloths);
  const {appliances} = useAppSelector(state => state.appliances);

  const cleanId = activityId?.split(' ')[0];
  console.log('Clean ID:', cleanId);

  const handleDateChange = (_: any, selected?: Date) => {
    const currentDate = selected || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  // const getAppliancesList
  const validateForm = async (): Promise<boolean> => {
    try {
      await goodsValidationSchema.validate(
        {
          date,
          goodsType,
          amount,
          // selectedItems,
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

  const handleSubmitt = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const isValid = await validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }
      const requestBody = {
        goods: [
          {
            goodsType,
            date: date.toISOString(),
            // applianceType: goodsType === 1 ? applianceType : clothsType,
            item: selectedItems,
            notes: description,
            amount: Number(amount),
            image: [],
          },
        ],
      };

      console.log('requestBody', requestBody);

      cleanId
        ? await goodsUpdate({id: cleanId, payloadData: requestBody})
        : await dispatch(uploadGoods(requestBody)).unwrap();
      Alert.alert('success', 'Goods data submitted Successfully!', [
        {
          text: 'ok',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error('error submitting goods data', error);
      Alert.alert('Error', error.message || 'Failed to submitt goods data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedGoodsTypeDataList = () => {
    if (goodsType === 1) {
      return appliances;
    }
    return cloths;
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await dispatch(fetchGoodsType()).unwrap();
      await dispatch(fetchAppliances()).unwrap();
      await dispatch(fetchClothes()).unwrap();
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData =
      goods.length === 0 || cloths.length === 0 || appliances.length === 0;

    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (goods.length > 0 && cloths.length > 0 && appliances.length > 0) {
      setGoodsType(goods[0].value);
      setClothsType(cloths[0].value);
      setApplianceType(appliances[0].value);
    }
  }, [goods, cloths, appliances]);

  useEffect(() => {
    if (goodsType === 1) {
      setSelectedItems(appliances[0]);
    } else {
      setSelectedItems(cloths[0]);
    }
  }, [goodsType]);

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

  const handleRemovePhoto = async () => {
    Alert.alert('remove photo', 'Are you want to remove this photo?', [
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

  const fetchDetailsData = async () => {
    try {
      if (cleanId) {
        try {
          const response = await getGoodsDetailsById(cleanId);
          console.log('Response:', response);
          setDate(new Date(response.data.date));
          setGoodsType(response.data.goodsType);
          setDescription(response.data.notes);
          setAmount(response.data.amount.toString());
          setSelectedItems(response.data.item);
          if (response.data.goodsType === 1) {
            setApplianceType(response.data.item.value);
          } else {
            setClothsType(response.data.item.value);
          }
        } catch (error) {
          console.error('Error fetching nutrition details:', error);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDetailsData();
  }, [cleanId]);

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
          <Text style={styles.header}>What did you eat today?</Text>

          {/* Date Picker */}
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}>
            <Text>{date.toLocaleDateString('en-GB')}</Text>
            <CalenderIcon width={20} height={20} />
          </TouchableOpacity>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Choose goods</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={goodsType}
              onValueChange={value => {
                setGoodsType(value);
              }}>
              {goods.map((it: TGoodsType, i: number) => {
                return (
                  <Picker.Item
                    key={i.toString()}
                    label={it.label}
                    value={it.value}
                  />
                );
              })}
            </Picker>
            {errors.goodsType && (
              <Text style={styles.errorText}>{errors.goodsType}</Text>
            )}
          </View>

          <Text style={styles.label}>
            {goodsType === 1 ? 'Choose Appliance' : 'Choose Cloths'}
          </Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={goodsType === 1 ? applianceType : clothsType}
              onValueChange={value => {
                if (goodsType === 1) {
                  setApplianceType(Number(value));
                } else {
                  setClothsType(Number(value));
                }
                const selectedType = getSelectedGoodsTypeDataList().find(
                  (item: TGoodsType) => item.value === Number(value),
                );
                console.log('selectedType', selectedType);
                setSelectedItems(selectedType);
              }}>
              {getSelectedGoodsTypeDataList().map((it, i) => {
                return (
                  <Picker.Item key={i} label={it.label} value={it.value} />
                );
              })}
            </Picker>
            {errors.goodsType && (
              <Text style={styles.errorText}>{errors.goodsType}</Text>
            )}
          </View>

          <Text style={styles.label}>Amount Spent INR</Text>
          <TextInput
            placeholder="Amount Spent INR"
            value={amount}
            onChangeText={(text: string) => {
              setAmount(text);
              setErrors({...errors, amount: ''});
            }}
            keyboardType="numeric"
            style={styles.inputBox}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}
          {/* Description */}
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

          <Text style={styles.note}>
            Earn 10 points by uploading a picture!
          </Text>
          <View style={styles.instructionsCard}>
            <Text style={styles.cardHeading}>Smart Green Move</Text>
            <Text style={styles.cardPoints}>
              Next time, tryrenting rarely used item to save money & emission
            </Text>
          </View>

          {/* display photo if taken */}
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
            onPress={handleSubmitt}
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
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
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
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default GoodsForm;
