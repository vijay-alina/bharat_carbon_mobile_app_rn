import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TClothesState, TClothesTypeResponse } from "../types"
import { fetchClothes } from "./clothsThunk";
const initialState: TClothesState = {
    cloths: [],
    status: 'idle',
    error: null,
};
const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchClothes.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchClothes.fulfilled, (state, action: PayloadAction<TClothesTypeResponse>) => {
                state.status = 'succeeded';
                state.cloths = action.payload.data;
            })
            .addCase(fetchClothes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});
export default clothesSlice.reducer;