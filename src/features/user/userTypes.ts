export interface User {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  // Add other user fields as needed
}

export interface UserState {
  data: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
