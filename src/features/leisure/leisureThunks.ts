import {createAsyncThunk} from '@reduxjs/toolkit';
import {LeisureUpload} from '../../services/leisureService';

export const uploadLesiure = createAsyncThunk(
  'leisure/uploadLesiure',
  async (payload: any, thunkAPI) => {
    try {
      return await LeisureUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
