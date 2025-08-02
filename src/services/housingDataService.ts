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

export const getElectricityDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/electricity/getDetails/${id}`);
  return response.data;
};

export const electricityUpdate = async (
  payload: Partial<any>,
): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(
    `/electricity/update/${id}`,
    payloadData,
  );
  return response.data;
};

export const getFuelDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/fuel/getDetails/${id}`);
  return response.data;
};

export const fuelUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/fuel/update/${id}`, payloadData);
  return response.data;
};

export const getWaterDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/water/getDetails/${id}`);
  return response.data;
};

export const waterUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/water/update/${id}`, payloadData);
  return response.data;
};

export const getWasteDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/waste/getDetails/${id}`);
  return response.data;
};

export const wasteUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/waste/update/${id}`, payloadData);
  return response.data;
};

export const getApplianceDetailsById = async (id: string): Promise<any> => {
  const response = await apiClient.get(`/appliance/getDetails/${id}`);
  return response.data;
};

export const applianceUpdate = async (payload: Partial<any>): Promise<any> => {
  const {id, payloadData} = payload;
  const response = await apiClient.put(`/appliance/update/${id}`, payloadData);
  return response.data;
};

export const electricityDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/electricity/deleteElectricity/${id}`);
  return response.data;
};

export const fuelDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/fuel/deleteFuel/${id}`);
  return response.data;
};

export const waterDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/water/deleteWater/${id}`);
  return response.data;
};

export const wasteDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/waste/deleteWaste/${id}`);
  return response.data;
};

export const applianceDelete = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/appliance/deleteAppliance/${id}`);
  return response.data;
};
