import apiClient from './apiClient';

export const MobilityUpload = async (payload: Partial<any>): Promise<any> => {
  const response = await apiClient.post(`/mobility`, payload);
  return response.data;
};

export const getMobilityDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/mobility/getDetails/${id}`);
  return response.data;
};

export const mobilityUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/mobility/update/${id}`, payloadData);
  return response.data;
};

export const mobilityDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/mobility/deleteMobility/${id}`);
  return response.data;
};
