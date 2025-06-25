import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from './userTypes';
import {fetchUser, otpGet, otpVerify} from './userThunks';

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(otpGet.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(otpGet.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
      })
      .addCase(otpGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(otpVerify.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(otpVerify.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload.student;
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
