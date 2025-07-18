import {createAsyncThunk} from '@reduxjs/toolkit';
import {getProfiledata} from '../../services/myProfileService';

export const profileDataGet = createAsyncThunk(
  'myProfile/profileDataGet',
  async (_, thunkAPI) => {
    try {
      return await getProfiledata();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
