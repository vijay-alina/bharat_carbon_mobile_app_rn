import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary, MediaType, ImagePickerResponse, Asset, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import CustomButton from '../../common/button'; // Adjust import path as needed

const HousingDataScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Electricity');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [description, setDescription] = useState('');
  const [hasSolarPanel, setHasSolarPanel] = useState(false);
  const [solarUnitsConsumed, setSolarUnitsConsumed] = useState('');
  const [attachedPhoto, setAttachedPhoto] = useState<Asset | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleSubmit = () => {
    const formData = {
      selectedCategory,
      selectedMonth,
      selectedYear,
      unitsConsumed,
      description,
      hasSolarPanel,
      solarUnitsConsumed,
      attachedPhoto,
    };
    console.log('Form Data:', formData);
    // Handle form submission here
  };

  const getDisplayDate = () => {
    if (selectedMonth && selectedYear) {
      return `${selectedMonth} ${selectedYear}`;
    }
    return '';
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const confirmDateSelection = () => {
    setShowDatePicker(false);
  };

  const toggleSolarPanel = () => {
    setHasSolarPanel(!hasSolarPanel);
    if (!hasSolarPanel) {
      setSolarUnitsConsumed(''); // Clear solar units when unchecked
    }
  };

  const handleBackPress = () => {
    console.log('Back pressed');
    // Handle navigation back
  };

  const openCamera = () => {
    Alert.alert(
      'Select Option',
      'Choose an option to add photo',
      [
        { text: 'Camera', onPress: () => launchCameraOption() },
        { text: 'Gallery', onPress: () => launchGalleryOption() },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };

  const launchCameraOption = () => {
    const options: CameraOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.7,
      maxWidth: 1000,
      maxHeight: 1000,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        setAttachedPhoto(response.assets[0]);
      }
    });
  };

  const launchGalleryOption = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.7,
      maxWidth: 1000,
      maxHeight: 1000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        setAttachedPhoto(response.assets[0]);
      }
    });
  };

  const removePhoto = () => {
    setAttachedPhoto(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Housing Data</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Choose Usage Category */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Choose Usage Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Electricity" value="Electricity" />
              <Picker.Item label="Water" value="Water" />
              <Picker.Item label="Gas" value="Gas" />
            </Picker>
          </View>
        </View>

        {/* Select Month */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Month</Text>
          <TouchableOpacity 
            style={styles.datePickerButton} 
            onPress={openDatePicker}
            activeOpacity={0.7}
          >
            <Text style={[styles.dateText, !getDisplayDate() && styles.placeholderText]}>
              {getDisplayDate() || 'Enter month'}
            </Text>
            <Icon name="calendar-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Units Consumed */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Units Consumed (kWh)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter total units"
            value={unitsConsumed}
            onChangeText={setUnitsConsumed}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        {/* Add Description - Refined Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionLabel}>Add Description</Text>
          <View style={styles.descriptionRow}>
            <View style={styles.descriptionInputContainer}>
              <TextInput
                style={styles.descriptionTextInput}
                placeholder="Note (Optional)"
                value={description}
                onChangeText={setDescription}
                multiline
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity style={styles.emojiButton} activeOpacity={0.7} onPress={openCamera}>
              <Icon name="camera-outline" size={22} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.pointsText}>Earn 10 points by uploading a picture!</Text>
        </View>

        {/* Solar Panel Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={toggleSolarPanel}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, hasSolarPanel && styles.checkboxChecked]}>
            {hasSolarPanel && <Icon name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>Installed Solar Panel?</Text>
        </TouchableOpacity>

        {/* Solar Units Consumed - Show only if solar panel is checked */}
        {hasSolarPanel && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Solar Units Consumed (kWh)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Solar Electricity Consumption"
              value={solarUnitsConsumed}
              onChangeText={setSolarUnitsConsumed}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        )}

        {/* Attached Photo Section */}
        {attachedPhoto && (
          <View style={styles.photoSection}>
            <Text style={styles.label}>Attached photo</Text>
            <View style={styles.photoContainer}>
              <Image source={{ uri: attachedPhoto.uri }} style={styles.attachedImage} />
              <TouchableOpacity style={styles.removePhotoButton} onPress={removePhoto}>
                <Icon name="close-circle" size={24} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Submit"
            onPress={handleSubmit}
            backgroundColor="#00C896"
            textColor="#fff"
          />
        </View>
      </ScrollView>

      {/* Custom Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={closeDatePicker}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Month & Year</Text>
              <TouchableOpacity onPress={closeDatePicker}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.pickerRow}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Month</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Month" value="" />
                    {months.map((month, index) => (
                      <Picker.Item key={index} label={month} value={month} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Year</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Year" value="" />
                    {years.map((year, index) => (
                      <Picker.Item key={index} label={year.toString()} value={year.toString()} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={closeDatePicker}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.modalButton, 
                  styles.confirmButton,
                  (!selectedMonth || !selectedYear) && styles.disabledButton
                ]} 
                onPress={confirmDateSelection}
                disabled={!selectedMonth || !selectedYear}
              >
                <Text style={[
                  styles.confirmButtonText,
                  (!selectedMonth || !selectedYear) && styles.disabledButtonText
                ]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Medium',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  // Refined Description Section Styles
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Medium',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  descriptionInputContainer: {
    flex: 1,
  },
  descriptionTextInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
    textAlignVertical: 'center',
  },
  emojiButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsText: {
    fontSize: 12,
    color: '#4A90E2',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 2,
  },
  // Photo Section Styles
  photoSection: {
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  attachedImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#00C896',
    borderRadius: 3,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00C896',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Medium',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  // Date Picker Styles
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  placeholderText: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Medium',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#00C896',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
  },
  disabledButtonText: {
    color: '#999',
  },
});

export default HousingDataScreen;