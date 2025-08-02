import apiClient from './apiClient';
import {User} from '../features/user/userTypes';
import {setAccessToken} from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get(`/todos/${userId}`);
  return response.data;
};

export const updateUser = async (
  userId: string,
  userData: Partial<User>,
): Promise<User> => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
};

export const getOtp = async (email: string): Promise<User> => {
  const response = await apiClient.post(`/studentInfo/login`, {email});
  return response.data;
};

export const verifyOtp = async (payload: any): Promise<User> => {
  const response = await apiClient.post(`/studentInfo/verify-otp`, payload);
  console.log('response', response);
  setAccessToken(response.data.data.access_token);
  await AsyncStorage.setItem(
    'user',
    JSON.stringify(response.data.data.student),
  );
  return response.data.data;
};

export const profileUpdate = async (
  id: string,
  payload: any,
): Promise<User> => {
  const response = await apiClient.put(`/studentInfo/${id}`, payload);
  return response.data.data;
};

export const getOtpFamily = async (mobile: string): Promise<any> => {
  const response = await apiClient.post(`/familyAuth/login`, {
    mobileNumber: mobile,
  });
  return response.data;
};

export const familyOtpVerify = async (payload: any): Promise<any> => {
  console.log('payload', payload);
  const response = await apiClient.post(`/familyAuth/otpVerify`, {
    otp: payload.otp,
    mobileNumber: payload.mobileNumber,
  });
  console.log('response', response);
  setAccessToken(response.data.data.access_token);
  await AsyncStorage.setItem('user', JSON.stringify(response.data.data.family));

  return response.data.data;
};

export const getOtpAddedFamily = async (mobile: string): Promise<any> => {
  const response = await apiClient.post(
    `/familyAuth/checkFamilyMobileNumberByOtp`,
    {
      mobileNumber: mobile,
    },
  );
  return response.data;
};

export const verifyOtpAddedFamily = async (
  mobile: string,
  otp: string,
): Promise<any> => {
  const response = await apiClient.post(`/familyAuth/familyAddedOtpVerify`, {
    mobileNumber: mobile,
    otp: otp,
  });
  return response.data;
};
