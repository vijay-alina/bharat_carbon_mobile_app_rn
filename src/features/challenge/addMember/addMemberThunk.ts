import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMember, memberSubmit } from '../../../services/memberService';
import { TAddMemberFormPayload, TMember } from '../types';

export const getMembersThunk = createAsyncThunk<TMember[]>(
  'members/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMember();
      return response.data; // array of members
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitMemberThunk = createAsyncThunk<TMember, TAddMemberFormPayload>(
  'members/submit',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await memberSubmit(memberData);
      return response.data; // <- returns the single new member
    } catch (error: any) {
        console.log('error.response?.data---',error.response?.data);
        console.log('---error',error.message);
        
        
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
