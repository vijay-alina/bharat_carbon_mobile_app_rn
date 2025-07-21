import apiClient from './apiClient';
import {
  TAddMemberFormPayload,
  TAddMemberFormResponse,
  TGetMembersResponse,
  TMember,
} from '../features/challenge/types';

export const getMember = async (): Promise<TGetMembersResponse> => {
  const response = await apiClient.get('/familyMember');
  return response.data;
};

export const memberSubmit = async (
  payload: TAddMemberFormPayload,
): Promise<TAddMemberFormResponse> => {
  const response = await apiClient.post('/familyMember', payload);
  return response.data;
};

export const getMemberById = async (familyId: string): Promise<TMember> => {
  const response = await apiClient.get(`/familyMember/${familyId}`);
  return response.data.data;
};

export const updateMember = async (
  familyId: string,
  payload: {fullName: string; mobileNumber: string; relationship: string},
): Promise<TMember> => {
  const response = await apiClient.put(`/familyMember/${familyId}`, payload);
  return response.data.data;
};

export const deleteMember = async (
  familyId: string,
): Promise<{message: string}> => {
  const response = await apiClient.delete(`/familyMember/${familyId}`);
  return response.data;
};
