import apiClient from './apiClient';
import {User} from '../features/user/userTypes';

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
