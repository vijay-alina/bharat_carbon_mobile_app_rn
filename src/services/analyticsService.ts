import {AnalyticsResponse} from '../features/analytics/analyticsType';
import apiClient from './apiClient';

export const getCategoryWiseEmissionData = async (
  year: number,
): Promise<AnalyticsResponse> => {
  const response = await apiClient.get(`/analytics/${year}/all`);

  const data = {
    status: 'success',
    message: 'Analytics data found successfully',
    data: {
      totalEmission: {
        value: 20,
        unit: 'kg CO2e',
        year: '2025',
      },
      monthlyEmission: [
        {
          month: 1,
          name: 'Jan',
          value: 9,
          unit: 'kg CO2e',
        },
        {
          month: 2,
          name: 'Feb',
          value: 2,
          unit: 'kg CO2e',
        },
        {
          month: 3,
          name: 'Mar',
          value: 5,
          unit: 'kg CO2e',
        },
        {
          month: 4,
          name: 'Apr',
          value: 7,
          unit: 'kg CO2e',
        },
        {
          month: 5,
          name: 'May',
          value: 6,
          unit: 'kg CO2e',
        },
        {
          month: 6,
          name: 'Jun',
          value: 4,
          unit: 'kg CO2e',
        },
        {
          month: 7,
          name: 'Jul',
          value: 3,
          unit: 'kg CO2e',
        },
        {
          month: 8,
          name: 'Aug',
          value: 1,
          unit: 'kg CO2e',
        },
        {
          month: 9,
          name: 'Sep',
          value: 10,
          unit: 'kg CO2e',
        },
        {
          month: 10,
          name: 'Oct',
          value: 8,
          unit: 'kg CO2e',
        },
        {
          month: 11,
          name: 'Nov',
          value: 2,
          unit: 'kg CO2e',
        },
        {
          month: 12,
          name: 'Dec',
          value: 3,
          unit: 'kg CO2e',
        },
      ],
      category: response.data.data,
    },
  };
  return data;
};
