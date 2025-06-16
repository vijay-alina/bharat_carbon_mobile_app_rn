import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getFoodItem} from './dropdownThunks';
import {dropdownState} from './dropdownType';

const initialState: dropdownState = {
  foodItem: null,
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
        console.log('uploadNutrition.fulfilled', action.payload);
        state.status = 'succeeded';
        state.foodItem = action.payload.data;
      })
      .addCase(getFoodItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default dropdownSlice.reducer;
