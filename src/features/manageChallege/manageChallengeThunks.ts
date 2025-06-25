import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  AcceptChallenge,
  GetOngoingChallegeInfo,
} from '../../services/manageChallengeService';
import {ChallengePaylodType} from './manageChallengeType';

export const ongoingChallengeGet = createAsyncThunk(
  'manageChallenge/ongoingChallengeGet',
  async (challangeType:string, thunkAPI) => {
    try {
      return await GetOngoingChallegeInfo(challangeType);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const challengeAccept = createAsyncThunk(
  'manageChallenge/challengeAccept',
  async (payload: ChallengePaylodType, thunkAPI) => {
    try {
      return await AcceptChallenge(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
