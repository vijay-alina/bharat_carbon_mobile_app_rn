import {createAsyncThunk} from '@reduxjs/toolkit';
import {getLeaderboardData} from '../../services/leaderboardService';

export const leaderboardGet = createAsyncThunk(
  'leaderboard/leaderboardGet',
  async (_, thunkAPI) => {
    try {
      return await getLeaderboardData();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
