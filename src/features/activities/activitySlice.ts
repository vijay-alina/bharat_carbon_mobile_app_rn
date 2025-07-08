import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ActivityResponse,
  ActivityState,
  MonthlyActivityResponse,
} from './activityType';
import {activityGet, monthlyActivityGet} from './activityThunks';
import {act} from 'react';

const initialState: ActivityState = {
  activities: [],
  monthlyActivities: [],
  status: 'idle',
  error: null,
};

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(activityGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        activityGet.fulfilled,
        (state, action: PayloadAction<ActivityResponse>) => {
          state.status = 'succeeded';
          if (action.payload.page === 1) {
            state.activities = action.payload.data;
          } else if (action.payload.page === 2) {
            state.activities = [...state.activities, ...action.payload.data];
          }
        },
      )
      .addCase(activityGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(monthlyActivityGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        monthlyActivityGet.fulfilled,
        (state, action: PayloadAction<MonthlyActivityResponse>) => {
          state.status = 'succeeded';
          state.monthlyActivities = action.payload.data;
        },
      )
      .addCase(monthlyActivityGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default activitySlice.reducer;
