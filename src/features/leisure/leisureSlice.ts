import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LeisureState} from './leisureType';
import { uploadLesiure } from './leisureThunks';

const initialState: LeisureState = {
  leisure: null,
  status: 'idle',
  error: null,
};

const leisureSlice = createSlice({
  name: 'leisure',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadLesiure.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadLesiure.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.leisure = action.payload.data;
        },
      )
      .addCase(uploadLesiure.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default leisureSlice.reducer;
