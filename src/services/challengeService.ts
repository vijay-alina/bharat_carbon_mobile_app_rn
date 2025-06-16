import apiClient from './apiClient';
import { TGoodsTypeResponse } from '../features/challenge/goods/types';

export const getGoodsType = async (): Promise<TGoodsTypeResponse> => {
    console.log('getGoodsType-called-here');
  const response = await apiClient.get('/dropdown/goodsType');
  console.log(response);
  return response.data;
};
