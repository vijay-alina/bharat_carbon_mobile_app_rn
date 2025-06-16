export interface Leisure {
  date: Date;
  leisureActivity: number;
  people: number;
  amount: number;
  unit: string;
  notes: string;
  image: string[];
}

export interface LeisureState {
  leisure: Leisure[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
