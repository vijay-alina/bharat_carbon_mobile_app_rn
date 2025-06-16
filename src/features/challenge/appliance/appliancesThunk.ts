import { createAsyncThunk, } from "@reduxjs/toolkit";
import { getAppliances } from "../../../services/challengeService";

export const fetchAppliances = createAsyncThunk(
    'appliances/fetchAppliances',
    async (_, thunkAPI) => {
        try {
            return await getAppliances();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Fetch failed',
            );

        }
    }
)