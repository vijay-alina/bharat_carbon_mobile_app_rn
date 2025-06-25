import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {challengeAccept, ongoingChallengeGet} from './manageChallengeThunks';
import {ManageChallengeState, OngoingChallenge} from './manageChallengeType';

const initialState: ManageChallengeState = {
  ongoingChallenge: [],
  status: 'idle',
  error: null,
};

const manageChallengeSlice = createSlice({
  name: 'manageChallenge',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ongoingChallengeGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        ongoingChallengeGet.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('ongoingChallengeGet.fulfilled', action.payload);
          state.status = 'succeeded';
          state.ongoingChallenge = action.payload.data;
        },
      )
      .addCase(ongoingChallengeGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(challengeAccept.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        challengeAccept.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('challengeAccept.fulfilled', action.payload);
          state.status = 'succeeded';
          state.ongoingChallenge = [
            ...state.ongoingChallenge,
            action.payload.data,
          ];
        },
      )
      .addCase(challengeAccept.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default manageChallengeSlice.reducer;
