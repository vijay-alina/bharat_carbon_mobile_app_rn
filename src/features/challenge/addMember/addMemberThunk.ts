import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMember, memberSubmit ,getMemberById,updateMember, deleteMember} from '../../../services/memberService';
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
      console.log('error.response?.data---', error.response?.data);
      console.log('---error', error.message);
 
 
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
 
 
export const getMemberByIdThunk = createAsyncThunk(
  'members/getById',
  async (familyId:string, { rejectWithValue }) => {
    try {
      const data = await getMemberById(familyId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
 
export const updateMemberThunk = createAsyncThunk<
  TMember,
  { familyId: string; payload: { fullName: string; mobileNumber: string; relationship: string } }
>('members/update', async ({ familyId, payload }, { rejectWithValue }) => {
  try {
    const data = await updateMember(familyId, payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
 
export const deleteMemberThunk = createAsyncThunk<
  string, // returning deleted member ID
  string  // familyId
>('members/delete', async (familyId, { rejectWithValue }) => {
  try {
    await deleteMember(familyId);
    return familyId;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});