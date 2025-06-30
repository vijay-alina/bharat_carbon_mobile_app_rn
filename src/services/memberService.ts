import apiClient from './apiClient';
import { TAddMemberFormPayload, TAddMemberFormResponse, TGetMembersResponse } from '../features/challenge/types';

export const getMember = async (): Promise<TGetMembersResponse> => {
  const response = await apiClient.get('/familyMember');
  return response.data;
};


export const memberSubmit = async (
  payload: TAddMemberFormPayload
): Promise<TAddMemberFormResponse> => {
  const response = await apiClient.post('/familyMember', payload);
  return response.data;
};



