interface Statistic {
  id: string;
  icon: any;
  title: string;
  value: number;
}

interface Badge {
  id: string;
  icon: any;
  title: string;
}

interface UnfinishedChallenge {
  id: string;
  icon: any;
  header: string;
  duration: number;
  description: string;
  color: string;
  completedDays: number;
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
  unFinishedChallenges: UnfinishedChallenge[];
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
