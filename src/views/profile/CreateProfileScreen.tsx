/* eslint-disable no-unreachable */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  StatusBar,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import * as yup from 'yup';
import CustomInput from '../../common/input';
import CustomButton from '../../common/button';
import {Header} from '../../common/header';
import {CameraIcon} from '../../images/icons';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../context/AppContext';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateProfile} from '../../features/user/userThunks';

// Yup validation schema
const validationSchema = yup.object().shape({
  id: yup.string().required('ID is required'),
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
  mobileNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]?[\d\s\-()]{10,}$/, 'Please enter a valid phone number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .lowercase()
    .trim(),
  schoolName: yup.string().required('School name is required').trim(),
  class: yup.number().required('Class name is required'),
  location: yup.string().required('Location is required').trim(),
});

type ProfileFormData = yup.InferType<typeof validationSchema>;

interface ValidationErrors {
  [key: string]: string;
}

const CreateProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {completeOnboarding} = useAppContext();
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const student = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ProfileFormData>({
    id: student?._id || '',
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    mobileNumber: student?.mobileNumber || '',
    email: student?.email || '',
    schoolName: student?.schoolCollegeId || '',
    class: student?.class || 0,
    location: student?.location || '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('student', student);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'class' ? parseInt(value) || 0 : value,
    }));
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: ValidationErrors = {};
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

  // const validateField = async (field: keyof ProfileFormData, value: string) => {
  //   try {
  //     await validationSchema.validateAt(field, {[field]: value});
  //     // Clear error for this field if validation passes
  //     if (errors[field]) {
  //       setErrors(prev => ({
  //         ...prev,
  //         [field]: '',
  //       }));
  //     }
  //   } catch (error) {
  //     if (error instanceof yup.ValidationError) {
  //       setErrors(prev => ({
  //         ...prev,
  //         [field]: error.message,
  //       }));
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    // Remove this line: return navigation.navigate('ClimateManifestoScreen');

    const isValid = await validateForm();

    if (!isValid) {
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const validatedData = await validationSchema.validate(formData, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log('Validated form data:', validatedData);

      await dispatch(updateProfile(validatedData)).unwrap();

      console.log('Validated form data:', validatedData);

      Alert.alert('Success', 'Profile created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFormData({
              id: '',
              firstName: '',
              lastName: '',
              mobileNumber: '',
              email: '',
              schoolName: '',
              class: 0,
              location: '',
            });
            setErrors({});
            // Navigate to next screen in onboarding flow OR complete onboarding
            //@ts-ignore
            navigation.navigate('ClimateManifestoScreen');
            // OR if this is the last step: completeOnboarding();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePress = () => {
    Alert.alert('Profile Picture', 'Choose an option', [
      {text: 'Camera', onPress: () => console.log('Open camera')},
      {text: 'Gallery', onPress: () => console.log('Open gallery')},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  useEffect(() => {
    const backAction = () => {
      setBackPressedOnce(true);
      completeOnboarding();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [backPressedOnce, completeOnboarding]); // Add

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView>
        <Header
          title="Create Profile"
          containerStyle={styles.containerStyle}
          disableBackButton={true}
        />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePress}>
            <Image
              source={{
                uri: student?.image,
              }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIcon}>
              <CameraIcon />
            </View>
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <CustomInput
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={value => handleInputChange('firstName', value)}
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
                  onChangeText={value => handleInputChange('lastName', value)}
                  placeholder="Swami"
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
            </View>
            <CustomInput
              label="Phone Number"
              value={formData.mobileNumber}
              onChangeText={value => handleInputChange('mobileNumber', value)}
              placeholder="78122 45690"
              keyboardType="phone-pad"
              leftElement={<Text style={styles.countryCode}>+91</Text>}
            />
            {errors.mobileNumber && (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            )}
            <CustomInput
              label="Email Address"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              placeholder="akshay@bharatcarbon.earth"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <CustomInput
              label="School Name"
              value={formData.schoolName}
              onChangeText={value => handleInputChange('schoolName', value)}
              placeholder="Green Valley High School"
              editable={false}
            />
            {errors.schoolName && (
              <Text style={styles.errorText}>{errors.schoolName}</Text>
            )}
            <CustomInput
              label="Class Name"
              value={formData.class === 0 ? '' : formData.class.toString()}
              onChangeText={value => handleInputChange('class', value)}
              placeholder="7"
              keyboardType="numeric"
              editable={false}
            />
            {errors.class && (
              <Text style={styles.errorText}>{errors.class}</Text>
            )}
            <CustomInput
              label="Location"
              value={formData.location}
              onChangeText={value => handleInputChange('location', value)}
              placeholder="304, Meritas hakone, KPHB"
            />
            {errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
          </View>
          <CustomButton
            text={isSubmitting ? 'Saving Profile...' : 'Save Profile'}
            onPress={handleSubmit}
            showIcon={true}
            isRightIcon={true}
            // iconName="arrow-forward"
            backgroundColor="#6B7280"
            style={styles.submitButton}
          />
        </View>
      </SafeAreaView>
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
  containerStyle: {
    marginTop: 44,
  },
});

export default CreateProfileScreen;
