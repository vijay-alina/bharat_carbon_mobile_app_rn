import apiClient from './apiClient';

export const LeisureUpload = async (payload: Partial<any>): Promise<any> => {
  const response = await apiClient.post(`/leisure`, payload);
  return response.data;
};
