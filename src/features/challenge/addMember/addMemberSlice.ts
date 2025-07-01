import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMembersThunk, submitMemberThunk } from './addMemberThunk';
import { TMember } from '../types';

interface MemberState {
    members: TMember[];
    loading: boolean;
    error: string | null;
}

const initialState: MemberState = {
    members: [],
    loading: false,
    error: null,
};

const memberSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMembersThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembersThunk.fulfilled, (state, action: PayloadAction<TMember[]>) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(getMembersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(submitMemberThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitMemberThunk.fulfilled, (state, action: PayloadAction<TMember>) => {
                state.loading = false;
                state.members.push(action.payload); 
            })

            .addCase(submitMemberThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default memberSlice.reducer;
