import {createAsyncThunk} from '@reduxjs/toolkit';
import {nutritionUpload} from '../../services/nutritionService';

export const uploadNutrition = createAsyncThunk(
  'nutrition/uploadNutrition',
  async (payload: any, thunkAPI) => {
    try {
      return await nutritionUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
