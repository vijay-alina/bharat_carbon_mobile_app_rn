import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  challengeAccept,
  ChallengeStatusWiseList,
  ongoingChallengeGet,
} from './manageChallengeThunks';
import {
  ChallengeListResponse,
  ManageChallengeState,
  OngoingChallenge,
} from './manageChallengeType';

const initialState: ManageChallengeState = {
  ongoingChallenge: [],
  ongoingChallengeList: [],
  completedChallengeList: [],
  totalLengthOngoingChallenge: 0,
  totalLengthCompletedChallenge: 0,
  totalLengthNotCompletedChallenge: 0,
  notCompletedCahallengeList: [],
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
      })

      .addCase(ChallengeStatusWiseList.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        ChallengeStatusWiseList.fulfilled,
        (state, action: PayloadAction<ChallengeListResponse>) => {
          console.log('ChallengeStatusWiseList.fulfilled', action.payload);
          state.status = 'succeeded';
          if (action.payload.listType === 'ongoing') {
            state.totalLengthOngoingChallenge = action.payload.totalLength;
            state.ongoingChallengeList = [
              ...state.ongoingChallengeList,
              ...action.payload.data,
            ];
          } else if (action.payload.listType === 'completed') {
            state.totalLengthCompletedChallenge = action.payload.totalLength;
            state.completedChallengeList = [
              ...state.completedChallengeList,
              ...action.payload.data,
            ];
          } else {
            state.totalLengthNotCompletedChallenge = action.payload.totalLength;
            state.notCompletedCahallengeList = [
              ...state.notCompletedCahallengeList,
              ...action.payload.data,
            ];
          }
        },
      )
      .addCase(ChallengeStatusWiseList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default manageChallengeSlice.reducer;
