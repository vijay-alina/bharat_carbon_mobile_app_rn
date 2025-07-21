interface Statistic {
  id: string;
  icon: string;
  title: string;
  value: number;
  unit: string;
}

interface Badge {
  id: string;
  icon: string;
  title: string;
}

interface Challenge {
  id: string;
  icon: string;
  header: string;
  duration: number;
  points: number;
  completedDays: number;
  color: string;
  description: string;
}

interface FamilyMember {
  id: string;
  relation: string;
  name: string;
  pointEarned: number;
  emissions: number;
}

interface FamilyRecord {
  totalEmissions: number;
  topContributer: string;
  familyList: FamilyMember[];
}

export interface ProfileData {
  name: string;
  earnedPoints: number;
  schoolRank: number;
  classRank: number;
  statistics: Statistic[];
  myBadges: Badge[];
  unFinishedChallenges: Challenge[];
  familyRecord: FamilyRecord;
}

export interface getProfiledataResponse {
  status: string;
  message: string;
  data: ProfileData;
}

export interface myProfileState {
  myProfile: ProfileData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
