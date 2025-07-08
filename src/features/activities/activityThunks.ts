import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getActivitiesList,
  monthWiseGetActivitiesList,
} from '../../services/activitiesService';

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
  async (_, thunkAPI) => {
    try {
      return await monthWiseGetActivitiesList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
