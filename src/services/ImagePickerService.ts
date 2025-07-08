import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';

export interface ImagePickerOptions {
  mediaType?: MediaType;
  includeBase64?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  quality?: PhotoQuality;
}

export interface ImageResult {
  uri: string | null;
  base64: string | null;
  fileName?: string;
  fileSize?: number;
  type?: string;
}

export class ImagePickerService {
  private static defaultOptions: ImagePickerOptions = {
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
  };

  // Request camera permission for Android
  private static async requestCameraPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    return true;
  }

  // Private method to open camera
  private static async openCamera(
    options: ImagePickerOptions = {},
  ): Promise<ImageResult | null> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
      return null;
    }

    const mergedOptions = {...this.defaultOptions, ...options};

    return new Promise(resolve => {
      launchCamera(
        {...mergedOptions, mediaType: mergedOptions.mediaType || 'photo'},
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            resolve(null);
            return;
          }

          if (response.errorMessage) {
            Alert.alert('Error', 'Failed to open camera. Please try again.');
            resolve(null);
            return;
          }

          if (response.assets && response.assets[0]) {
            const asset = response.assets[0];
            resolve({
              uri: asset.uri || null,
              base64: asset.base64 || null,
              fileName: asset.fileName,
              fileSize: asset.fileSize,
              type: asset.type,
            });
          } else {
            resolve(null);
          }
        },
      );
    });
  }

  // Private method to open gallery
  private static async openGallery(
    options: ImagePickerOptions = {},
  ): Promise<ImageResult | null> {
    const mergedOptions = {...this.defaultOptions, ...options};

    return new Promise(resolve => {
      launchImageLibrary(
        {...mergedOptions, mediaType: mergedOptions.mediaType || 'photo'},
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            resolve(null);
            return;
          }

          if (response.errorMessage) {
            Alert.alert('Error', 'Failed to open gallery. Please try again.');
            resolve(null);
            return;
          }

          if (response.assets && response.assets[0]) {
            const asset = response.assets[0];
            resolve({
              uri: asset.uri || null,
              base64: asset.base64 || null,
              fileName: asset.fileName,
              fileSize: asset.fileSize,
              type: asset.type,
            });
          } else {
            resolve(null);
          }
        },
      );
    });
  }

  // Main public method to show image picker with options
  static async pickImage(
    options: ImagePickerOptions = {},
    config?: {
      title?: string;
      message?: string;
      cameraText?: string;
      galleryText?: string;
      cancelText?: string;
    },
  ): Promise<ImageResult | null> {
    const {
      title = 'Select Image',
      message = 'Choose an option',
      cameraText = 'Camera',
      galleryText = 'Gallery',
      cancelText = 'Cancel',
    } = config || {};

    return new Promise(resolve => {
      Alert.alert(title, message, [
        {
          text: cameraText,
          onPress: async () => {
            try {
              const result = await this.openCamera(options);
              resolve(result);
            } catch (error) {
              console.error('Camera error:', error);
              Alert.alert('Error', 'Failed to open camera');
              resolve(null);
            }
          },
        },
        {
          text: galleryText,
          onPress: async () => {
            try {
              const result = await this.openGallery(options);
              resolve(result);
            } catch (error) {
              console.error('Gallery error:', error);
              Alert.alert('Error', 'Failed to open gallery');
              resolve(null);
            }
          },
        },
        {text: cancelText, style: 'cancel', onPress: () => resolve(null)},
      ]);
    });
  }
}
