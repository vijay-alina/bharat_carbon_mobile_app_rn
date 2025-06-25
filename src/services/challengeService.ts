import apiClient from './apiClient';
import { TApplianceTypeResponse, TClothesTypeResponse, TGoodsTypeResponse } from '../features/challenge/types';

export const getGoodsType = async (): Promise<TGoodsTypeResponse> => {
  const response = await apiClient.get('/dropdown/goodsType');
  return response.data;
};

export const getClothes = async (): Promise<TClothesTypeResponse> => {
  const response = await apiClient.get('/dropdown/clothes');
  return response.data;
}

export const getAppliances = async () : Promise<TApplianceTypeResponse> => {
  const response = await apiClient.get('dropdown/appliance')
  return response.data;
  
}