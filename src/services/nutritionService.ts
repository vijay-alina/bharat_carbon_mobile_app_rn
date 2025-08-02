import apiClient from './apiClient';
import {Nutrition} from '../features/nutrition/nutritionType';

export const nutritionUpload = async (payload: Partial<any>): Promise<any> => {
  const response = await apiClient.post(`/nutrition`, payload);
  return response.data;
};

export const getNutritionDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/nutrition/getDetails/${id}`);
  return response.data;
};

export const nutritionUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/nutrition/update/${id}`, payloadData);
  return response.data;
};

export const nutritionDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/nutrition/deleteNutrition/${id}`);
  return response.data;
};
