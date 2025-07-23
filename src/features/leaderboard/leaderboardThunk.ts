import {createAsyncThunk} from '@reduxjs/toolkit';
import {getFamilyLeaderboardData, getLeaderboardData} from '../../services/leaderboardService';

export const leaderboardGet = createAsyncThunk(
  'leaderboard/leaderboardGet',
  async (year: number, thunkAPI) => {
    try {
      return await getLeaderboardData(year);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const familyLeaderboardGet = createAsyncThunk(
  'leaderboard/familyLeaderboardGet',
  async (_, thunkAPI) => {
    try {
      return await getFamilyLeaderboardData();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
