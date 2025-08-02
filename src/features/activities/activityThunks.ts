import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getActivitiesList,
  monthWiseGetActivitiesList,
} from '../../services/activitiesService';
import {mobilityDelete} from '../../services/mobilityService';
import {nutritionDelete} from '../../services/nutritionService';
import {goodsDelete} from '../../services/challengeService';
import {leisureDelete} from '../../services/leisureService';
import {
  applianceDelete,
  electricityDelete,
  fuelDelete,
  wasteDelete,
  waterDelete,
} from '../../services/housingDataService';

export const activityGet = createAsyncThunk(
  'activities/activityGet',
  async (payload: any, thunkAPI) => {
    try {
      return await getActivitiesList(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const monthlyActivityGet = createAsyncThunk(
  'activities/monthlyActivityGet',
  async (param: any, thunkAPI) => {
    try {
      return await monthWiseGetActivitiesList(param);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const deleteActivities = createAsyncThunk(
  'nutrition/deleteActivities',
  async (
    payload: {
      id: string;
      subCategory: string;
    },
    thunkAPI,
  ) => {
    try {
      if (payload?.subCategory === 'Mobility') {
        return await mobilityDelete(payload?.id);
      } else if (payload?.subCategory === 'Nutrition') {
        return await nutritionDelete(payload?.id);
      } else if (payload?.subCategory === 'Goods') {
        return await goodsDelete(payload?.id);
      } else if (payload?.subCategory === 'Leisure') {
        return await leisureDelete(payload?.id);
      } else if (payload?.subCategory === 'Electricity') {
        return await electricityDelete(payload?.id);
      } else if (payload?.subCategory === 'Fuel') {
        return await fuelDelete(payload?.id);
      } else if (payload?.subCategory === 'Water') {
        return await waterDelete(payload?.id);
      } else if (payload?.subCategory === 'Waste') {
        return await wasteDelete(payload?.id);
      } else if (payload?.subCategory === 'Appliances') {
        return await applianceDelete(payload?.id);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'mobility Not deleted',
      );
    }
  },
);
