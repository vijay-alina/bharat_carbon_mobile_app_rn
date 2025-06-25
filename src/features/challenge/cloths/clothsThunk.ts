import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClothes } from "../../../services/challengeService";

export const fetchClothes = createAsyncThunk(
    'cloths/fetchClothes',
    async (_, thunkAPI) => {
        try {
            return await getClothes();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Fetch failed',
            );
        }
    }
)


