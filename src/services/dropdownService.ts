import apiClient from './apiClient';
import {FoodItem} from '../features/dropdown/dropdownType';

export const foodItemList = async (): Promise<FoodItem[]> => {
  const response = await apiClient.get(`/dropdown/foodItems`);
  return response.data;
};
