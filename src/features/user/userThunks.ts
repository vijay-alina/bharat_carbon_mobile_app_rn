import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUserById} from '../../services/userService';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, thunkAPI) => {
    try {
      return await getUserById(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
