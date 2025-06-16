import {createAsyncThunk} from '@reduxjs/toolkit';
import {housingDataUpload} from '../../services/housingDataService';

export const uploadHousingData = createAsyncThunk(
  'housingData/uploadHousingData',
  async (payload: any, thunkAPI) => {
    try {
      return await housingDataUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
