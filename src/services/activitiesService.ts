import {
  ActivityResponse,
  MonthlyActivityResponse,
} from '../features/activities/activityType';
import apiClient from './apiClient';
import {activities, monthActivities, activityTwo} from '../constants/constants';

export const getActivitiesList = async (
  param: any,
): Promise<ActivityResponse> => {
  // const response = await apiClient.get(`/activities/${filterParam}`);
  if (param.page === 1) {
    const data = {
      status: 'success',
      message: 'success',
      data: activities,
      totalLength: 35,
      page: 1,
    };
    return data;
  } else {
    const data = {
      status: 'success',
      message: 'success',
      data: activityTwo,
      totalLength: 35,
      page: 2,
    };
    return data;
  }
};

export const monthWiseGetActivitiesList =
  async (): Promise<MonthlyActivityResponse> => {
    // const response = await apiClient.get(`/activities`);
    const data = {
      status: 'success',
      message: 'success',
      data: monthActivities,
    };
    return data;
  };
