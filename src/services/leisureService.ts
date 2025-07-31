import apiClient from './apiClient';

export const LeisureUpload = async (payload: Partial<any>): Promise<any> => {
  const response = await apiClient.post(`/leisure`, payload);
  return response.data;
};

export const getLeisureDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/leisure/getDetails/${id}`);
  return response.data;
};

export const leisureUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/leisure/update/${id}`, payloadData);
  return response.data;
};
