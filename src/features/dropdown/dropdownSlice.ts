import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getAppliences,
  getFoodItem,
  getFuelType,
  getGasUsed,
  getLeisureActivity,
  getMealStyle,
  getMealType,
  getTravelMode,
  getTripType,
  getWasteType,
  getWaterSource,
} from './dropdownThunks';
import {dropdownState} from './dropdownType';

const initialState: dropdownState = {
  foodItem: [],
  mealType: [],
  mealStyle: [],
  fuelType: [],
  waterSource: [],
  appliance: [],
  gasUsed: [],
  leisureActivity: [],
  travelMode: [],
  tripType: [],
  wasteType: [],
  status: 'idle',
  error: null,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFoodItem.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFoodItem.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.foodItem = action.payload.data;
      })
      .addCase(getFoodItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getMealType.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMealType.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.mealType = action.payload.data;
      })
      .addCase(getMealType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getMealStyle.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMealStyle.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.mealStyle = action.payload.data;
      })
      .addCase(getMealStyle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getFuelType.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFuelType.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.fuelType = action.payload.data;
      })
      .addCase(getFuelType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getWaterSource.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getWaterSource.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.waterSource = action.payload.data;
        },
      )
      .addCase(getWaterSource.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getAppliences.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAppliences.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.appliance = action.payload.data;
      })
      .addCase(getAppliences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getGasUsed.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getGasUsed.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.gasUsed = action.payload.data;
      })
      .addCase(getGasUsed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getLeisureActivity.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getLeisureActivity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.leisureActivity = action.payload.data;
        },
      )
      .addCase(getLeisureActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getTripType.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTripType.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.tripType = action.payload.data;
      })
      .addCase(getTripType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getTravelMode.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTravelMode.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.travelMode = action.payload.data;
      })
      .addCase(getTravelMode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getWasteType.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWasteType.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.wasteType = action.payload.data;
      })
      .addCase(getWasteType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default dropdownSlice.reducer;
