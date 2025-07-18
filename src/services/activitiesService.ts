import {
  ActivityResponse,
  MonthlyActivityResponse,
} from '../features/activities/activityType';
import apiClient from './apiClient';
import {activities, monthActivities, activityTwo} from '../constants/constants';

export const getActivitiesList = async (
  param: any,
): Promise<ActivityResponse> => {
  console.log('param', param);
  const response = await apiClient.get(
    `/analytics/activity/${param?.currentYear}/${param.activityType}?page=${param?.page}&limit=${param?.limit}`,
  );
  // if (param.page === 1) {
  //   const data = {
  //     status: 'success',
  //     message: 'success',
  //     data: activities,
  //     totalLength: 35,
  //     page: 1,
  //   };
  //   return data;
  // } else {
  //   const data = {
  //     status: 'success',
  //     message: 'success',
  //     data: activityTwo,
  //     totalLength: 35,
  //     page: 2,
  //   };
  // }
  return response.data;
};

export const monthWiseGetActivitiesList = async (
  param: any,
): Promise<MonthlyActivityResponse> => {
  const response = await apiClient.get(
    `/analytics/activity/month/${param?.month}/${param?.year}`,
  );
  // const data = {
  //   status: 'success',
  //   message: 'success',
  //   data: monthActivities,
  // };
  return response.data;
};
