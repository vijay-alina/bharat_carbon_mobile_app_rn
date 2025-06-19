import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  applienceList,
  foodItemList,
  fuelTypeList,
  gasUsedList,
  leisureActivityName,
  mealStyleList,
  mealTypeList,
  waterSourceList,
} from '../../services/dropdownService';

export const getFoodItem = createAsyncThunk(
  'dropdown/getFoodItem',
  async (_, thunkAPI) => {
    try {
      return await foodItemList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getMealType = createAsyncThunk(
  'dropdown/getMealType',
  async (_, thunkAPI) => {
    try {
      return await mealTypeList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getMealStyle = createAsyncThunk(
  'dropdown/getMealStyle',
  async (_, thunkAPI) => {
    try {
      return await mealStyleList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getFuelType = createAsyncThunk(
  'dropdown/getFuelType',
  async (_, thunkAPI) => {
    try {
      return await fuelTypeList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getWaterSource = createAsyncThunk(
  'dropdown/getWaterSource',
  async (_, thunkAPI) => {
    try {
      return await waterSourceList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getAppliences = createAsyncThunk(
  'dropdown/getAppliences',
  async (_, thunkAPI) => {
    try {
      return await applienceList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getGasUsed = createAsyncThunk(
  'dropdown/getGasUsed',
  async (_, thunkAPI) => {
    try {
      return await gasUsedList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);

export const getLeisureActivity = createAsyncThunk(
  'dropdown/getLeisureActivity',
  async (_, thunkAPI) => {
    try {
      return await leisureActivityName();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Fetch failed',
      );
    }
  },
);
