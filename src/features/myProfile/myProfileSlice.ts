import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getProfiledataResponse,
  myProfileState,
  StatisticsResponse,
} from './myProfileType';
import {
  familyMemberProfileDataGet,
  profileDataGet,
  statisticsdataGet,
} from './myProfileThunks';

const initialState: myProfileState = {
  myProfile: null,
  statistics: null,
  status: 'idle',
  error: null,
};

const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(profileDataGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        profileDataGet.fulfilled,
        (state, action: PayloadAction<getProfiledataResponse>) => {
          state.status = 'succeeded';
          state.myProfile = action.payload.data;
        },
      )
      .addCase(profileDataGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(familyMemberProfileDataGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        familyMemberProfileDataGet.fulfilled,
        (state, action: PayloadAction<getProfiledataResponse>) => {
          state.status = 'succeeded';
          state.myProfile = action.payload.data;
        },
      )
      .addCase(familyMemberProfileDataGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(statisticsdataGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        statisticsdataGet.fulfilled,
        (state, action: PayloadAction<StatisticsResponse>) => {
          state.status = 'succeeded';
          state.statistics = action.payload.data;
        },
      )
      .addCase(statisticsdataGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default myProfileSlice.reducer;
