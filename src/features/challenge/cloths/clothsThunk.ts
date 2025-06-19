import { createAsyncThunk } from '@reduxjs/toolkit';
import { getClothes } from '../../../services/challengeService';

export const fetchClothes = createAsyncThunk(
    'clothes/fetchClothes',
    async () => {
        const data = await getClothes();
        return data;
    }
);


