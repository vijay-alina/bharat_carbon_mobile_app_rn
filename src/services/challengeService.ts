import apiClient from './apiClient';
import {
  TApplianceTypeResponse,
  TClothesTypeResponse,
  TGoodsTypeResponse,
} from '../features/challenge/types';

export const getGoodsType = async (): Promise<TGoodsTypeResponse> => {
  const response = await apiClient.get('/dropdown/goodsType');
  return response.data;
};

export const getClothes = async (): Promise<TClothesTypeResponse> => {
  const response = await apiClient.get('/dropdown/clothes');
  return response.data;
};

export const getAppliances = async (): Promise<TApplianceTypeResponse> => {
  const response = await apiClient.get('dropdown/appliance');
  return response.data;
};

export const submitGoods = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/goods', payload);
  console.log(response);
  return response.data;
};

export const getGoodsDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/goods/getDetails/${id}`);
  return response.data;
};

export const goodsUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/goods/update/${id}`, payloadData);
  return response.data;
};
