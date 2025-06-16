import apiClient from './apiClient';
import {Nutrition} from '../features/nutrition/nutritionType';

export const nutritionUpload = async (
  payload: Partial<any>,
): Promise<any> => {
  const response = await apiClient.post(`/nutrition`, payload);
  return response.data;
};
