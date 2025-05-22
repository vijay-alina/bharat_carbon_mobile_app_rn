import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import * as yup from 'yup';
// import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../../common/input';
import CustomButton from '../../common/button';

// Yup validation schema
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .trim(),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .trim(),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]?[\d\s\-()]{10,}$/, 'Please enter a valid phone number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .lowercase()
    .trim(),
  schoolName: yup
    .string()
    .required('School name is required')
    .trim(),
  className: yup
    .string()
    .required('Class name is required')
    .trim(),
  location: yup
    .string()
    .required('Location is required')
    .trim(),
});

type ProfileFormData = yup.InferType<typeof validationSchema>;

interface ValidationErrors {
  [key: string]: string;
}

const CreateProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    schoolName: '',
    className: '',
    location: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Optional: Real-time validation on blur/change
    // Uncomment below for real-time validation
    // validateField(field, value);
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const validateField = async (field: keyof ProfileFormData, value: string) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      // Clear error for this field if validation passes
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: '',
        }));
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({
          ...prev,
          [field]: error.message,
        }));
      }
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    
    if (!isValid) {
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Transform data according to schema (trim, lowercase, etc.)
      const validatedData = await validationSchema.validate(formData, { 
        abortEarly: false,
        stripUnknown: true 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Validated form data:', validatedData);
      
      Alert.alert(
        'Success',
        'Profile created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                schoolName: '',
                className: '',
                location: '',
              });
              setErrors({});
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePress = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Profile</Text>
        
        {/* Profile Picture */}
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            }}
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            {/* <Ionicons name="camera" size={16} color="#fff" /> */}
          </View>
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <CustomInput
                label="First Name"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Akshay"
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>
            
            <View style={styles.halfWidth}>
              <CustomInput
                label="Last Name"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Swami"
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>
          </View>

          <CustomInput
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            placeholder="78122 45690"
            keyboardType="phone-pad"
            leftElement={
              <Text style={styles.countryCode}>+91</Text>
            }
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}

          <CustomInput
            label="Email Address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="akshay@bharatcarbon.earth"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <CustomInput
            label="School Name"
            value={formData.schoolName}
            onChangeText={(value) => handleInputChange('schoolName', value)}
            placeholder="Green Valley High School"
          />
          {errors.schoolName && (
            <Text style={styles.errorText}>{errors.schoolName}</Text>
          )}

          <CustomInput
            label="Class Name"
            value={formData.className}
            onChangeText={(value) => handleInputChange('className', value)}
            placeholder="Grade 7"
          />
          {errors.className && (
            <Text style={styles.errorText}>{errors.className}</Text>
          )}

          <CustomInput
            label="Location"
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
            placeholder="304, Meritas hakone, KPHB"
          />
          {errors.location && (
            <Text style={styles.errorText}>{errors.location}</Text>
          )}
        </View>

        {/* Submit Button */}
        <CustomButton
          text={isSubmitting ? "Saving Profile..." : "Save Profile"}
          onPress={handleSubmit}
          showIcon={!isSubmitting}
          iconName="arrow-forward"
          backgroundColor="#6B7280"
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#10b981',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  formContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
});

export default CreateProfileForm;