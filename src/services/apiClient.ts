import axios from 'axios';
import {Platform} from 'react-native';
import {getAccessToken} from '../utils/auth';

const API_CONFIG = {
  // Replace with your actual IP address for physical device testing
  ANDROID_EMULATOR: 'http://10.0.2.2:3000/dev',
  IOS_SIMULATOR: 'http://localhost:3000/dev',
  PHYSICAL_DEVICE: 'http://192.168.29.78:3000/dev', // Replace with your computer's IP
  PRODUCTION: 'https://your-api-domain.com/api',
};

const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return API_CONFIG.ANDROID_EMULATOR;
    }
    return API_CONFIG.IOS_SIMULATOR;
  }
  return API_CONFIG.PRODUCTION;
};

const apiClient = axios.create({
  baseURL: 'http://iccdevapi.bharatcarbon.earth',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    const token = await getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    if (error.code === 'UND_ERR_HEADERS_TIMEOUT') {
      console.error('Headers timeout - backend might be slow or unreachable');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
