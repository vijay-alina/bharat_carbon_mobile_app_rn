import {profileData} from '../constants/constants';
import {getProfiledataResponse} from '../features/myProfile/myProfileType';
import apiClient from './apiClient';

export const getProfiledata = async (): Promise<getProfiledataResponse> => {
  const response = await apiClient.get(`/profile/profileInfo`);

  // const data = {
  //   status: 'success',
  //   message: 'succuss Full fetch profile Data',
  //   data: profileData,
  // };
  return response.data;
};
