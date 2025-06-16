import {createAsyncThunk} from '@reduxjs/toolkit';
import {getGoodsType} from '../../../services/challengeService';

export const fetchGoodsType = createAsyncThunk(
  'goods/fetchGoodsType',
  async (_, thunkAPI) => {
    try {
      return await getGoodsType();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
