import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from './userTypes';
import {
  fetchUser,
  otpGet,
  otpGetFamily,
  otpVerify,
  otpVerifyFamily,
} from './userThunks';

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
        console.log('action.payload', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.student;
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(otpGetFamily.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
      })
      .addCase(
        otpVerifyFamily.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('action.payload', action.payload);
          state.status = 'succeeded';
          state.user = action.payload.family;
        },
      );
  },
});

export default userSlice.reducer;
