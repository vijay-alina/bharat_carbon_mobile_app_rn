import {createAsyncThunk} from '@reduxjs/toolkit';
import {foodItemList} from '../../services/dropdownService';

export const getFoodItem = createAsyncThunk(
  'dropdown/getFoodItem',
  async (_, thunkAPI) => {
    try {
      return await foodItemList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
