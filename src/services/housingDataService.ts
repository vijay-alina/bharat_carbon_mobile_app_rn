import apiClient from './apiClient';
import {HousingData} from '../features/housingData/housingDataType';

export const housingDataUpload = async (
  payload: Partial<any>,
): Promise<any> => {
  const response = await apiClient.post(`/electricity`, payload);
  return response.data;
};
