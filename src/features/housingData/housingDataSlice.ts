import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HousingDataState} from './housingDataType';
import {
  uploadAppliancesData,
  uploadElectricityData,
  uploadFuelData,
  uploadWasteData,
  uploadWaterData,
} from './housingDataThunks';

const initialState: HousingDataState = {
  electricity: [],
  fuel: [],
  water: [],
  waste: [],
  appliances: [],
  status: 'idle',
  error: null,
};

const housingDataSlice = createSlice({
  name: 'housingData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadElectricityData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadElectricityData.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadHousingData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.electricity = action.payload.data;
        },
      )
      .addCase(uploadElectricityData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(uploadFuelData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadFuelData.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadHousingData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.fuel = action.payload.data;
        },
      )
      .addCase(uploadFuelData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(uploadWaterData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadWaterData.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadHousingData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.water = action.payload.data;
        },
      )
      .addCase(uploadWaterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(uploadWasteData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadWasteData.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadHousingData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.waste = action.payload.data;
        },
      )
      .addCase(uploadWasteData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(uploadAppliancesData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadAppliancesData.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadHousingData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.appliances = action.payload.data;
        },
      )
      .addCase(uploadAppliancesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default housingDataSlice.reducer;
