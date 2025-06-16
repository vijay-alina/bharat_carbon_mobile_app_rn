import apiClient from './apiClient';
import { TApplianceTypeResponse, TClothesTypeResponse, TGoodsTypeResponse } from '../features/challenge/types';

export const getGoodsType = async (): Promise<TGoodsTypeResponse> => {
  console.log('getGoodsType-called-here');
  const response = await apiClient.get('/dropdown/goodsType');
  console.log(response);
  return response.data;
};

export const getClothes = async (): Promise<TClothesTypeResponse> => {
  console.log('getClothsType-called-here');
  const response = await apiClient.get('/dropdown/clothes');
  console.log(response);
  return response.data;
}

export const getAppliances = async () : Promise<TApplianceTypeResponse> => {
  console.log('getAppliances-called-here');
  const response = await apiClient.get('dropdown/appliance')
  console.log(response);
  return response.data;
  
}