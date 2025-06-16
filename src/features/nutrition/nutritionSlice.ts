import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NutritionState} from './nutritionType';
import {uploadNutrition} from './nutritionThunks';

const initialState: NutritionState = {
  nutrition: null,
  status: 'idle',
  error: null,
};

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadNutrition.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadNutrition.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadNutrition.fulfilled', action.payload);
          state.status = 'succeeded';
          state.nutrition = action.payload.data;
        },
      )
      .addCase(uploadNutrition.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default nutritionSlice.reducer;
