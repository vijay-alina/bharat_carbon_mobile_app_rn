import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LeaderboardResponse, LeaderboardState} from './leaderboardType';
import {leaderboardGet} from './leaderboardThunk';

const initialState: LeaderboardState = {
  leaderboard: null,
  status: 'idle',
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(leaderboardGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        leaderboardGet.fulfilled,
        (state, action: PayloadAction<LeaderboardResponse>) => {
          state.status = 'succeeded';
          state.leaderboard = action.payload.data;
        },
      )
      .addCase(leaderboardGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default leaderboardSlice.reducer;
