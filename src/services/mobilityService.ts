import apiClient from './apiClient';

export const MobilityUpload = async (payload: Partial<any>): Promise<any> => {
  const response = await apiClient.post(`/mobility`, payload);
  return response.data;
};
