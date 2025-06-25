export interface Mobility {
  transportMode: number;
  tripType: number;
  travelledFrom: string;
  travelledTo: string;
  distanceTravelled: number;
  date: Date;
  notes: string;
  image?: [];
}

export interface MobilityState {
  mobility: Mobility[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
