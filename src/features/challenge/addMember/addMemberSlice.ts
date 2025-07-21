import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMembersThunk, submitMemberThunk, getMemberByIdThunk, updateMemberThunk, deleteMemberThunk } from './addMemberThunk';
import { TMember } from '../types';
 
interface MemberState {
    members: TMember[];
    selectedMember: TMember | null;
    loading: boolean;
    error: string | null;
}
 
const initialState: MemberState = {
    members: [],
    selectedMember: null,
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
            })
 
            .addCase(getMemberByIdThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMemberByIdThunk.fulfilled, (state, action: PayloadAction<TMember>) => {
                state.loading = false;
                state.selectedMember = action.payload;
            })
            .addCase(getMemberByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateMemberThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.members.findIndex(m => m._id === action.payload._id);
                if (index !== -1) {
                    state.members[index] = action.payload;
                }
                if (state.selectedMember?._id === action.payload._id) {
                    state.selectedMember = action.payload;
                }
            })
            .addCase(deleteMemberThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.members = state.members.filter(m => m._id !== action.payload);
                if (state.selectedMember?._id === action.payload) {
                    state.selectedMember = null;
                }
            });
 
 
 
    },
});
export default memberSlice.reducer;
 