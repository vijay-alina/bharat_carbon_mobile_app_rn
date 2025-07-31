import {profileData, statisticsData} from '../constants/constants';
import {
  getProfiledataResponse,
  StatisticsResponse,
} from '../features/myProfile/myProfileType';
import apiClient from './apiClient';

export const getProfiledata = async (): Promise<getProfiledataResponse> => {
  const response = await apiClient.get(`/profile/profileInfo`);
  return response.data;
};

export const getFamilyMemberProfiledata =
  async (): Promise<getProfiledataResponse> => {
    const response = await apiClient.get(`/profile/familyMember/profileInfo`);
    return response.data;
  };

export const getStatisticsdata = async (): Promise<StatisticsResponse> => {
  const response = await apiClient.get(`/analytics/statistics`);
  // const response = statisticsData;
  return response.data;
};
