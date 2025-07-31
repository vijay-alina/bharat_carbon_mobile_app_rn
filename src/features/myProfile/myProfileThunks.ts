import {createAsyncThunk} from '@reduxjs/toolkit';
import {getFamilyMemberProfiledata, getProfiledata, getStatisticsdata} from '../../services/myProfileService';

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

export const familyMemberProfileDataGet = createAsyncThunk(
  'myProfile/familyMemberProfileDataGet',
  async (_, thunkAPI) => {
    try {
      return await getFamilyMemberProfiledata();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const statisticsdataGet = createAsyncThunk(
  'myProfile/statisticsdataGet',
  async (_, thunkAPI) => {
    try {
      return await getStatisticsdata();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
