import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAnalyticsCategoryWiseData} from './analyticsThunks';
import {AnalyticsResponse, AnalyticState} from './analyticsType';

const initialState: AnalyticState = {
  analytics: null,
  status: 'idle',
  error: null,
};

const analyticSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAnalyticsCategoryWiseData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getAnalyticsCategoryWiseData.fulfilled,
        (state, action: PayloadAction<AnalyticsResponse>) => {
          console.log('getAnalyticsCategoryWiseData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.analytics = action.payload.data;
        },
      )
      .addCase(getAnalyticsCategoryWiseData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default analyticSlice.reducer;
