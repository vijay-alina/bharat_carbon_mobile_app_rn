import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getProfiledataResponse, myProfileState} from './myProfileType';
import {profileDataGet} from './myProfileThunks';

const initialState: myProfileState = {
  myProfile: null,
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
      });
  },
});

export default myProfileSlice.reducer;
