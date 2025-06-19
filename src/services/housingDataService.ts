import apiClient from './apiClient';

export const electricityDataUpload = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/electricity', payload);
  return response.data;
};

export const fuelDataUpload = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/fuel', payload);
  return response.data;
};

export const waterDataUpload = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/water', payload);
  return response.data;
};

export const wasteDataUpload = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/waste', payload);
  return response.data;
};

export const appliancesDataUpload = async (payload: any): Promise<any> => {
  const response = await apiClient.post('/appliance', payload);
  return response.data;
};
