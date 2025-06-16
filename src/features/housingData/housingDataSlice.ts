import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HousingDataState} from './housingDataType';
import {uploadHousingData} from './housingDataThunks';

const initialState: HousingDataState = {
  housingData: null,
  status: 'idle',
  error: null,
};

const housingDataSlice = createSlice({
  name: 'housingData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadHousingData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadHousingData.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('uploadHousingData.fulfilled', action.payload);
          state.status = 'succeeded';
          state.housingData = action.payload.data;
        },
      )
      .addCase(uploadHousingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default housingDataSlice.reducer;
