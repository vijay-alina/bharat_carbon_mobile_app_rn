export interface LeaderboardStudent {
  studentId: string;
  name: string;
  class: string;
  points: number;
  schoolRank: number;
  classRank: number;
}

export interface LeaderboardTimeFrame {
  school: LeaderboardStudent[];
  class: LeaderboardStudent[];
}

export interface LeaderboardData {
  today: LeaderboardTimeFrame;
  weekly: LeaderboardTimeFrame;
  monthly: LeaderboardTimeFrame;
  allTime: LeaderboardTimeFrame;
}

export interface LeaderboardType {
  leaderboard: LeaderboardData;
}

export interface LeaderboardResponse {
  status: string;
  message: string;
  data: LeaderboardType;
}

export interface LeaderboardState {
  leaderboard: LeaderboardType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
