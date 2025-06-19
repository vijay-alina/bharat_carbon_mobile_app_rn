import React, {useState, useEffect} from 'react';
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
import {Colors} from '../../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg';
import CheckBoxIcon from '../../../../images/icons/checkbox.svg';
import UncheckedCheckBoxIcon from '../../../../images/icons/checkbox_uncheck.svg';
import {ImagePickerService} from '../../../../services/ImagePickerService';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {
  uploadElectricityData,
  uploadFuelData,
  uploadWaterData,
  uploadWasteData,
  uploadAppliancesData,
} from '../../../../features/housingData/housingDataThunks';
import {
  getAppliences,
  getFuelType,
  getGasUsed,
  getWaterSource,
} from '../../../../features/dropdown/dropdownThunks';

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

  // Set initial date state
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState('Electricity');
  const [fuelType, setFuelType] = useState<number | undefined>();
  const [waterSource, setWaterSource] = useState<number | undefined>();
  const [applianceType, setApplianceType] = useState<number | undefined>();
  const [brandName, setBrandName] = useState('');
  const [gasFilled, setGasFilled] = useState<number | undefined>();
  const [refrigerantCharge, setRefrigerantCharge] = useState('');
  const [consumed, setConsumed] = useState('');
  const [quantity, setQuantity] = useState('');

  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [isSolarInstalled, setIsSolarInstalled] = useState(false);
  const [solarUnits, setSolarUnits] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Get month and year as numbers
  const selectedMonth = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
  const selectedYear = date.getFullYear();

  const fuelTypeList = useAppSelector(state => state.dropdown.fuelType);
  const waterSourceList = useAppSelector(state => state.dropdown.waterSource);
  const applianceTypeList = useAppSelector(state => state.dropdown.appliance);
  const gasusedList = useAppSelector(state => state.dropdown.gasUsed);

  console.log('fuelTypeList', fuelTypeList);
  console.log('waterSourceList', waterSourceList);

  // Reset form fields and set appropriate date when category changes
  useEffect(() => {
    // Reset form fields
    setConsumed('');
    setQuantity('');
    setDescription('');
    setBrandName('');
    setGasFilled(undefined);
    setRefrigerantCharge('');
    setSolarUnits('');
    setIsSolarInstalled(false);
    setErrors({});

    // Set date based on category
    if (category === 'Electricity') {
      // For Electricity: first day of current month
      setDate(new Date(currentYear, currentDate.getMonth(), 1));
    } else {
      // For other categories: current date
      setDate(new Date());
    }
  }, [category]);

  const dateChange = (_: any, selected?: Date) => {
    setShowPicker(false);
    if (selected) {
      // For non-Electricity categories: Allow any date up to today
      if (selected <= new Date()) {
        setDate(selected);
        if (errors.date) {
          setErrors(prev => ({...prev, date: ''}));
        }
      } else {
        Alert.alert(
          'Invalid Selection',
          'Please select a date that is not in the future.',
        );
      }
    }
  };

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
      if (category === 'Electricity') {
        // For Electricity: Ensure the selected date is within the current year
        const selectedYear = selected.getFullYear();
        if (selectedYear === currentYear) {
          // Set to first day of selected month to focus on month selection
          const newDate = new Date(currentYear, selected.getMonth(), 1);
          setDate(newDate);
        } else {
          // If user tries to select different year, reset to current year
          Alert.alert(
            'Invalid Selection',
            `Please select a month from ${currentYear} only.`,
          );
          const resetDate = new Date(currentYear, currentDate.getMonth(), 1);
          setDate(resetDate);
        }
      } else {
        // For other categories: Allow any date up to today
        if (selected <= new Date()) {
          setDate(selected);
        } else {
          Alert.alert(
            'Invalid Selection',
            'Please select a date that is not in the future.',
          );
        }
      }
    }
  };

  // Handle input change with validation
  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'consumed':
        setConsumed(value);
        if (value && !/^\d*\.?\d*$/.test(value)) {
          setErrors(prev => ({
            ...prev,
            consumed: 'Please enter a valid number',
          }));
        } else if (value && parseFloat(value) <= 0) {
          setErrors(prev => ({
            ...prev,
            consumed: 'Value must be greater than 0',
          }));
        } else {
          setErrors(prev => ({...prev, consumed: ''}));
        }
        break;
      case 'quantity':
        setQuantity(value);
        if (value && !/^\d*\.?\d*$/.test(value)) {
          setErrors(prev => ({
            ...prev,
            quantity: 'Please enter a valid number',
          }));
        } else if (value && parseFloat(value) <= 0) {
          setErrors(prev => ({
            ...prev,
            quantity: 'Value must be greater than 0',
          }));
        } else {
          setErrors(prev => ({...prev, quantity: ''}));
        }
        break;
      case 'solarUnits':
        setSolarUnits(value);
        if (isSolarInstalled) {
          if (value && !/^\d*\.?\d*$/.test(value)) {
            setErrors(prev => ({
              ...prev,
              solarUnits: 'Please enter a valid number',
            }));
          } else if (value && parseFloat(value) <= 0) {
            setErrors(prev => ({
              ...prev,
              solarUnits: 'Value must be greater than 0',
            }));
          } else {
            setErrors(prev => ({...prev, solarUnits: ''}));
          }
        }
        break;
      case 'brandName':
        setBrandName(value);
        if (category === 'Appliances' && !value.trim()) {
          setErrors(prev => ({...prev, brandName: 'Brand name is required'}));
        } else {
          setErrors(prev => ({...prev, brandName: ''}));
        }
        break;
      case 'refrigerantCharge':
        setRefrigerantCharge(value);
        if (category === 'Appliances') {
          if (value && !/^\d*\.?\d*$/.test(value)) {
            setErrors(prev => ({
              ...prev,
              refrigerantCharge: 'Please enter a valid number',
            }));
          } else if (value && parseFloat(value) <= 0) {
            setErrors(prev => ({
              ...prev,
              refrigerantCharge: 'Value must be greater than 0',
            }));
          } else {
            setErrors(prev => ({...prev, refrigerantCharge: ''}));
          }
        }
        break;
      case 'description':
        setDescription(value);
        break;
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

  // Validate form based on selected category
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    let isValid = true;

    // Common validations for all categories
    if (!date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    // Category-specific validations
    switch (category) {
      case 'Electricity':
        if (!consumed || parseFloat(consumed) <= 0) {
          newErrors.consumed = 'Valid consumption value is required';
          isValid = false;
        }
        if (isSolarInstalled && (!solarUnits || parseFloat(solarUnits) <= 0)) {
          newErrors.solarUnits = 'Valid solar units value is required';
          isValid = false;
        }
        break;

      case 'Fuel':
        if (!consumed || parseFloat(consumed) <= 0) {
          newErrors.consumed = 'Valid fuel consumption is required';
          isValid = false;
        }
        break;

      case 'Water':
        if (!consumed || parseFloat(consumed) <= 0) {
          newErrors.consumed = 'Valid water consumption is required';
          isValid = false;
        }
        break;

      case 'Waste':
        if (!quantity || parseFloat(quantity) <= 0) {
          newErrors.quantity = 'Valid waste quantity is required';
          isValid = false;
        }
        break;

      case 'Appliances':
        if (!brandName) {
          newErrors.brandName = 'Brand name is required';
          isValid = false;
        }
        if (!refrigerantCharge || parseFloat(refrigerantCharge) <= 0) {
          newErrors.refrigerantCharge = 'Valid refrigerant charge is required';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit function with category-specific API calls
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Validate form based on selected category
      const isValid = validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Prepare image data
      const imageData = photoBase64 ? [photoBase64] : [];

      // Create request body based on category
      let requestBody;
      let unit;
      let apiAction = uploadElectricityData;

      switch (category) {
        case 'Electricity':
          requestBody = {
            electricities: [
              {
                month: selectedMonth,
                year: selectedYear,
                consumption: parseFloat(consumed),
                notes: description,
                unit: 'kWh',
                isSolarInstalled: isSolarInstalled,
                electricityGenerationUnit: isSolarInstalled ? 'kWh' : undefined,
                electricityGeneration: isSolarInstalled
                  ? parseFloat(solarUnits)
                  : undefined,
                image: imageData,
              },
            ],
          };
          apiAction = uploadElectricityData;
          break;

        case 'Fuel':
          unit = fuelTypeList.find(item => item.value === fuelType)?.state;

          requestBody = {
            fuels: [
              {
                date: date.toISOString(),
                quantity: parseFloat(consumed),
                fuel: fuelType,
                notes: description,
                unit: 'liters',
                image: imageData,
              },
            ],
          };
          apiAction = uploadFuelData;
          break;

        case 'Water':
          unit = waterSourceList.find(
            item => item.value === waterSource,
          )?.state;

          requestBody = {
            waters: [
              {
                date: date.toISOString(),
                consumed: parseFloat(consumed),
                waterSource: waterSource,
                notes: description,
                unit,
                image: imageData,
              },
            ],
          };
          apiAction = uploadWaterData;
          break;

        case 'Waste':
          requestBody = {
            wastes: [
              {
                date: date.toISOString(),
                quantity: parseFloat(quantity),
                wasteType: 1,
                notes: description,
                unit: 'kg',
                image: imageData,
              },
            ],
          };
          apiAction = uploadWasteData;
          break;

        case 'Appliances':
          unit = gasusedList.find(item => item.value === gasFilled)?.state;

          requestBody = {
            appliances: [
              {
                year: selectedYear,
                type: applianceType,
                brandName: brandName,
                gasFilled: gasFilled,
                charge: parseFloat(refrigerantCharge),
                unit,
                notes: description,
                // image: imageData,
              },
            ],
          };
          apiAction = uploadAppliancesData;
          break;
      }

      console.log('Request Body:', requestBody);

      // Call the appropriate API based on category
      await dispatch(apiAction(requestBody)).unwrap();

      Alert.alert('Success', `${category} data submitted successfully!`, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      console.error(`Error submitting ${category} data:`, error);
      Alert.alert(
        'Error',
        error.message || `Failed to submit ${category} data`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await dispatch(getFuelType()).unwrap();
      await dispatch(getWaterSource()).unwrap();
      await dispatch(getAppliences()).unwrap();
      await dispatch(getGasUsed()).unwrap();
      console.log(response);
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData =
      fuelTypeList.length === 0 ||
      waterSourceList.length === 0 ||
      applianceTypeList.length === 0 ||
      gasusedList.length === 0;

    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (
      fuelTypeList.length > 0 &&
      waterSourceList.length > 0 &&
      applianceTypeList.length > 0 &&
      gasusedList.length > 0
    ) {
      setFuelType(fuelTypeList[0].value);
      setWaterSource(waterSourceList[0].value);
      setGasFilled(gasusedList[0].value);
    }
  }, [fuelTypeList, waterSourceList]);

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

          {/* Date selector for all categories */}
          {category === 'Electricity' ? (
            <>
              <Text style={styles.label}>Select Month ({currentYear})</Text>
              <TouchableOpacity
                style={[styles.inputBox, errors.date && styles.inputError]}
                onPress={() => setShowPicker(true)}>
                <Text style={styles.dateText}>
                  {getMonthName(selectedMonth)} {selectedYear}
                </Text>
                <CalenderIcon width={24} height={24} />
              </TouchableOpacity>
            </>
          ) : (
            category !== 'Appliances' && (
              <>
                <Text style={styles.label}>Select Date</Text>
                <TouchableOpacity
                  style={[styles.inputBox, errors.date && styles.inputError]}
                  onPress={() => setShowPicker(true)}>
                  <Text>{date.toLocaleDateString('en-GB')}</Text>
                  <CalenderIcon width={24} height={24} />
                </TouchableOpacity>
              </>
            )
          )}

          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

          {showPicker && (
            <DateTimePicker
              value={date}
              mode={category === 'Electricity' ? 'date' : 'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={
                category === 'Electricity' ? handleDateChange : dateChange
              }
              minimumDate={
                category === 'Electricity'
                  ? new Date(currentYear, 0, 1)
                  : undefined
              }
              maximumDate={
                category === 'Electricity'
                  ? new Date(currentYear, 11, 31)
                  : new Date()
              }
            />
          )}

          {/* Electricity Form */}
          {category === 'Electricity' && (
            <>
              <Text style={styles.label}>Units Consumed (kWh)</Text>
              <TextInput
                placeholder="Enter total units"
                value={consumed}
                onChangeText={value => handleInputChange('consumed', value)}
                keyboardType="numeric"
                style={[styles.inputBox, errors.consumed && styles.inputError]}
              />
              {errors.consumed && (
                <Text style={styles.errorText}>{errors.consumed}</Text>
              )}
            </>
          )}

          {/* Fuel Form */}
          {category === 'Fuel' && (
            <>
              <Text style={styles.label}>Fuel Type</Text>
              <View style={styles.pickerBox}>
                <Picker selectedValue={fuelType} onValueChange={setFuelType}>
                  {fuelTypeList.map(fuelType => (
                    <Picker.Item
                      key={fuelType.dataId}
                      label={fuelType.label}
                      value={fuelType.value}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Quantity Consumed (L)</Text>
              <TextInput
                placeholder="Enter quantity"
                value={consumed}
                onChangeText={value => handleInputChange('consumed', value)}
                keyboardType="numeric"
                style={[styles.inputBox, errors.consumed && styles.inputError]}
              />
              {errors.consumed && (
                <Text style={styles.errorText}>{errors.consumed}</Text>
              )}
            </>
          )}

          {/* Water Form */}
          {category === 'Water' && (
            <>
              <Text style={styles.label}>Water Source</Text>
              <View style={styles.pickerBox}>
                <Picker
                  selectedValue={waterSource}
                  onValueChange={setWaterSource}>
                  {waterSourceList.map(waterSource => (
                    <Picker.Item
                      key={waterSource.dataId}
                      label={waterSource.label}
                      value={waterSource.value}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Quantity Consumed (L)</Text>
              <TextInput
                placeholder="Enter quantity"
                value={consumed}
                onChangeText={value => handleInputChange('consumed', value)}
                keyboardType="numeric"
                style={[styles.inputBox, errors.consumed && styles.inputError]}
              />
              {errors.consumed && (
                <Text style={styles.errorText}>{errors.consumed}</Text>
              )}
            </>
          )}

          {/* Waste Form */}
          {category === 'Waste' && (
            <>
              <Text style={styles.label}>Quantity of waste Generated (kg)</Text>
              <TextInput
                placeholder="Enter quantity"
                value={quantity}
                onChangeText={value => handleInputChange('quantity', value)}
                keyboardType="numeric"
                style={[styles.inputBox, errors.quantity && styles.inputError]}
              />
              {errors.quantity && (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              )}
            </>
          )}

          {/* Appliances Form */}
          {category === 'Appliances' && (
            <>
              <Text style={styles.label}>Appliance Type</Text>
              <View style={styles.pickerBox}>
                <Picker
                  selectedValue={applianceType}
                  onValueChange={setApplianceType}>
                  <Picker.Item label="Select Appliance Type" value="" />
                  {applianceTypeList.map(applianceType => (
                    <Picker.Item
                      key={applianceType.dataId}
                      label={applianceType.label}
                      value={applianceType.value}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {category === 'Appliances' && applianceType && (
            <>
              <Text style={styles.label}>Brand Name</Text>
              <TextInput
                placeholder="Enter brand name"
                value={brandName}
                onChangeText={value => handleInputChange('brandName', value)}
                style={[styles.inputBox, errors.brandName && styles.inputError]}
              />
              {errors.brandName && (
                <Text style={styles.errorText}>{errors.brandName}</Text>
              )}

              <>
                <Text style={styles.label}>Gas Filled</Text>
                <View style={styles.pickerBox}>
                  <Picker
                    selectedValue={gasFilled}
                    onValueChange={setGasFilled}>
                    {gasusedList.map(gasFilled => (
                      <Picker.Item
                        key={gasFilled.dataId}
                        label={gasFilled.label}
                        value={gasFilled.value}
                      />
                    ))}
                  </Picker>
                </View>
                {errors.gasFilled && (
                  <Text style={styles.errorText}>{errors.gasFilled}</Text>
                )}

                <Text style={styles.label}>
                  Total Refrigerant Charge (kg or L)
                </Text>
                <TextInput
                  placeholder="Enter refrigerant charge"
                  value={refrigerantCharge}
                  onChangeText={value =>
                    handleInputChange('refrigerantCharge', value)
                  }
                  keyboardType="numeric"
                  style={[
                    styles.inputBox,
                    errors.refrigerantCharge && styles.inputError,
                  ]}
                />
                {errors.refrigerantCharge && (
                  <Text style={styles.errorText}>
                    {errors.refrigerantCharge}
                  </Text>
                )}
              </>

              <Text style={styles.label}>Add Description</Text>
              <View style={styles.inputWithIcon}>
                <View style={styles.inputWrapperBox}>
                  <TextInput
                    placeholder="Note (Optional)"
                    value={description}
                    onChangeText={value =>
                      handleInputChange('description', value)
                    }
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
            </>
          )}

          {category !== 'Appliances' && (
            <>
              <Text style={styles.label}>Add Description</Text>
              <View style={styles.inputWithIcon}>
                <View style={styles.inputWrapperBox}>
                  <TextInput
                    placeholder="Note (Optional)"
                    value={description}
                    onChangeText={value =>
                      handleInputChange('description', value)
                    }
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
            </>
          )}

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

          {category === 'Electricity' && (
            <>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setIsSolarInstalled(!isSolarInstalled)}>
                  {isSolarInstalled ? (
                    <CheckBoxIcon width={24} height={24} />
                  ) : (
                    <UncheckedCheckBoxIcon width={24} height={24} />
                  )}
                  <Text style={styles.checkboxLabel}>
                    Installed Solar Panel?
                  </Text>
                </TouchableOpacity>
              </View>

              {isSolarInstalled && (
                <>
                  <Text style={styles.label}>Solar Units Generated (kWh)</Text>
                  <TextInput
                    placeholder="Solar Electricity Generation"
                    value={solarUnits}
                    onChangeText={value =>
                      handleInputChange('solarUnits', value)
                    }
                    keyboardType="numeric"
                    style={[
                      styles.inputBox,
                      errors.solarUnits && styles.inputError,
                    ]}
                  />
                  {errors.solarUnits && (
                    <Text style={styles.errorText}>{errors.solarUnits}</Text>
                  )}
                </>
              )}
            </>
          )}

          {/* Submit Button */}
          {category !== 'Appliances' ? (
            <CustomButton
              text={isSubmitting ? 'Submitting...' : 'Submit'}
              onPress={handleSubmit}
              backgroundColor="#17a086"
              style={styles.submitButton}
              disabled={isSubmitting}
            />
          ) : (
            applianceType && (
              <CustomButton
                text={isSubmitting ? 'Submitting...' : 'Submit'}
                onPress={handleSubmit}
                backgroundColor="#17a086"
                style={styles.submitButton}
                disabled={isSubmitting}
              />
            )
          )}
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
  dateText: {
    fontSize: 16,
    color: Colors.Black3,
    fontFamily: 'Montserrat-Regular',
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
