export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  name: string;
  activityType: string;
  subCategory: string;
}

export interface EventIndicator {
  color: string;
  type: string;
}

export interface MonthActivity {
  id: string;
  title: string;
  date: number;
  events: EventIndicator;
  timestamp: string;
  name: string;
  activityType: string;
}

export interface ActivityResponse {
  status: string;
  message: string;
  data: Activity[];
  totalLength: number;
  page: number;
}

export interface MonthlyActivityResponse {
  status: string;
  message: string;
  data: MonthActivity[];
}

export interface ActivityState {
  activities: Activity[] | [];
  monthlyActivities: MonthActivity[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
