import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MobilityState} from './mobilityType';
import { uploadMobility} from './mobilityThunks';

const initialState: MobilityState = {
  mobility: null,
  status: 'idle',
  error: null,
};

const mobilitySlice = createSlice({
  name: 'mobility',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadMobility.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        uploadMobility.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = 'succeeded';
          state.mobility = action.payload.data;
        },
      )
      .addCase(uploadMobility.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default mobilitySlice.reducer;
