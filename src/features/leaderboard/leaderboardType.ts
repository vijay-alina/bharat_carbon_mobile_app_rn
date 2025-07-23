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

export interface Student {
  _id: string;
  schoolCollegeId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  year: string;
  class: number;
  section: string;
  isDeleted: boolean;
  isActive: boolean;
  deletedOn: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  city: string;
  image: string;
  isTermCondition: boolean;
  location: string;
  pinCode: number;
  state: string;
  noOfFamilyMembers: number;
}

export interface FamilyLeaderboardTimeFrame {
  school: LeaderboardStudent;
  class: LeaderboardStudent;
}

export interface FamilyLeaderboardData {
  today: FamilyLeaderboardTimeFrame;
  weekly: FamilyLeaderboardTimeFrame;
  monthly: FamilyLeaderboardTimeFrame;
  allTime: FamilyLeaderboardTimeFrame;
}

export interface familyLeaderboardType {
  student: Student;
  leaderboard: FamilyLeaderboardData;
}

export interface LeaderboardResponse {
  status: string;
  message: string;
  data: LeaderboardType;
}

export interface FamilyLeaderboardResponse {
  status: string;
  message: string;
  data: familyLeaderboardType;
}

export interface LeaderboardState {
  leaderboard: LeaderboardType | null;
  familyLeaderboard: familyLeaderboardType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
