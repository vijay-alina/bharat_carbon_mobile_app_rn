import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TApplianceState, TApplianceTypeResponse } from "../types";
import { fetchAppliances } from "./appliancesThunk";
const initialState: TApplianceState = {
    appliances: [],
    status: 'idle',
    error: null,
}

const appliancesSlice = createSlice({
    name: 'appliances',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAppliances.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAppliances.fulfilled, (state, action: PayloadAction<TApplianceTypeResponse>) => {
                state.status = 'succeeded';
                state.appliances = action.payload.data;
            })
            .addCase(fetchAppliances.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
})

export default appliancesSlice.reducer;