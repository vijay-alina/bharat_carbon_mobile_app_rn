import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TGoodsState, TGoodsTypeResponse} from './types';
import { fetchGoodsType } from './goodsThunk';

const initialState: TGoodsState = {
  goods: [],
  status: 'idle',
  error: null,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGoodsType.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGoodsType.fulfilled, (state, action: PayloadAction<TGoodsTypeResponse>) => {
        state.status = 'succeeded';
        state.goods = action.payload.data;
      })
      .addCase(fetchGoodsType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default goodsSlice.reducer;
