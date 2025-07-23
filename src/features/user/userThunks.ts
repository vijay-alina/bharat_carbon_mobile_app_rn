import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  familyOtpVerify,
  getOtp,
  getOtpFamily,
  getUserById,
  profileUpdate,
  verifyOtp,
} from '../../services/userService';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, thunkAPI) => {
    try {
      return await getUserById(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const otpGet = createAsyncThunk(
  'user/otpGet',
  async (email: string, thunkAPI) => {
    try {
      return await getOtp(email);
    } catch (error: any) {
      console.error('Error fetching OTP thunk:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const otpVerify = createAsyncThunk(
  'user/otpVerify',
  async (payload: any, thunkAPI) => {
    try {
      return await verifyOtp(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (payload: any, thunkAPI) => {
    try {
      const data = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        mobileNumber: payload.mobileNumber,
        email: payload.email,
        schoolCollegeId: payload.schoolName,
        location: payload.location,
      };
      return await profileUpdate(payload.id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const otpGetFamily = createAsyncThunk(
  'user/otpGetFamily',
  async (mobile: string, thunkAPI) => {
    try {
      return await getOtpFamily(mobile);
    } catch (error: any) {
      console.error('Error fetching OTP thunk:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const otpVerifyFamily = createAsyncThunk(
  'user/otpVerifyFamily',
  async (payload: any, thunkAPI) => {
    try {
      return await familyOtpVerify(payload);
    } catch (error: any) {
      console.error('Error fetching OTP thunk:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
