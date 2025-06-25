import {createAsyncThunk} from '@reduxjs/toolkit';
import { MobilityUpload } from '../../services/mobilityService';

export const uploadMobility = createAsyncThunk(
  'nutrition/uploadMobility',
  async (payload: any, thunkAPI) => {
    try {
      return await MobilityUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
