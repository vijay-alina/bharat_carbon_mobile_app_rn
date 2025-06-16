import apiClient from './apiClient';
import {User} from '../features/user/userTypes';
import {setAccessToken} from '../utils/auth';

export const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get(`/todos/${userId}`);
  console.log(response.data);
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
  console.log(email);
  const response = await apiClient.post(`/studentInfo/login`, {email});
  console.log(response.data);
  return response.data;
};

export const verifyOtp = async (payload: any): Promise<User> => {
  console.log(payload);
  const response = await apiClient.post(`/studentInfo/verify-otp`, payload);
  setAccessToken(response.data.data.access_token);
  console.log(response.data);
  return response.data.data;
};

export const profileUpdate = async (
  id: string,
  payload: any,
): Promise<User> => {
  console.log(payload);
  const response = await apiClient.put(`/studentInfo/${id}`, payload);
  console.log(response.data);
  return response.data.data;
};
