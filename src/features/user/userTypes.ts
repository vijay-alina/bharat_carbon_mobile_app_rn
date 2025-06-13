export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  schoolCollegeId: string;
  section: string;
  year: string;
  class: number;
  location: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedOn: string | null;
  __v: number;
}

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
