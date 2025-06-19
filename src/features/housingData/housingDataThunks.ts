// import {createAsyncThunk} from '@reduxjs/toolkit';
// import {housingDataUpload} from '../../services/housingDataService';

// export const uploadHousingData = createAsyncThunk(
//   'housingData/uploadHousingData',
//   async (payload: any, thunkAPI) => {
//     try {
//       return await housingDataUpload(payload);
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Fetch failed',
//       );
//     }
//   },
// );

import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  electricityDataUpload,
  fuelDataUpload,
  waterDataUpload,
  wasteDataUpload,
  appliancesDataUpload,
} from '../../services/housingDataService';

export const uploadElectricityData = createAsyncThunk(
  'housingData/uploadElectricityData',
  async (payload: any, thunkAPI) => {
    try {
      return await electricityDataUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Upload failed',
      );
    }
  },
);

export const uploadFuelData = createAsyncThunk(
  'housingData/uploadFuelData',
  async (payload: any, thunkAPI) => {
    try {
      return await fuelDataUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Upload failed',
      );
    }
  },
);

export const uploadWaterData = createAsyncThunk(
  'housingData/uploadWaterData',
  async (payload: any, thunkAPI) => {
    try {
      return await waterDataUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Upload failed',
      );
    }
  },
);

export const uploadWasteData = createAsyncThunk(
  'housingData/uploadWasteData',
  async (payload: any, thunkAPI) => {
    try {
      return await wasteDataUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Upload failed',
      );
    }
  },
);

export const uploadAppliancesData = createAsyncThunk(
  'housingData/uploadAppliancesData',
  async (payload: any, thunkAPI) => {
    try {
      return await appliancesDataUpload(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Upload failed',
      );
    }
  },
);
