import apiClient from './apiClient';
import {
  ApplianceType,
  FoodItem,
  Fueltype,
  GasUsedType,
  leisureActivityNameType,
  MealStyle,
  MealType,
  WaterSourceType,
} from '../features/dropdown/dropdownType';
import {Water} from '../features/housingData/housingDataType';

export const foodItemList = async (): Promise<FoodItem[]> => {
  const response = await apiClient.get(`/dropdown/foodItems`);
  return response.data;
};

export const mealTypeList = async (): Promise<MealType[]> => {
  const response = await apiClient.get(`/dropdown/mealType`);
  return response.data;
};

export const mealStyleList = async (): Promise<MealStyle[]> => {
  const response = await apiClient.get(`/dropdown/mealStyle`);
  return response.data;
};

export const fuelTypeList = async (): Promise<Fueltype[]> => {
  const response = await apiClient.get(`/dropdown/fueltypeused`);
  return response.data;
};

export const waterSourceList = async (): Promise<WaterSourceType[]> => {
  const response = await apiClient.get(`/dropdown/waterSource`);
  return response.data;
};

export const applienceList = async (): Promise<ApplianceType[]> => {
  const response = await apiClient.get(`/dropdown/appliance`);
  return response.data;
};

export const gasUsedList = async (): Promise<GasUsedType[]> => {
  const response = await apiClient.get(`/dropdown/acGasUsed`);
  return response.data;
};

export const leisureActivityName = async (): Promise<
  leisureActivityNameType[]
> => {
  const response = await apiClient.get(`/dropdown/leisureActivityName `);
  return response.data;
};
