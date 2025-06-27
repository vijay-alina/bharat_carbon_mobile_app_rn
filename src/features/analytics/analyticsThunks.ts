import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCategoryWiseEmissionData} from '../../services/analyticsService';

export const getAnalyticsCategoryWiseData = createAsyncThunk(
  'analytics/getAnalyticsCategoryWiseData',
  async (year: number, thunkAPI) => {
    try {
      return await getCategoryWiseEmissionData(year);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
