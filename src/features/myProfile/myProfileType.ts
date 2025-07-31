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
  schoolRank?: number;
  classRank?: number;
  familyRank?: number;
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

export interface EcoImpact {
  key: number;
  value: number;
  svg: {
    fill: string;
  };
  label: string;
  point: string;
}

export interface GrowthGraph {
  pointsData: number[];
  emissionsData: number[];
}

export interface GoalTracking {
  totalPoints: number;
}

export interface ChallengeOverview {
  housingAccepetedPoint: number;
  housingEarnedPoint: number;
  mobilityAcceptedPoint: number;
  mobilityEarnedPoint: number;
  housingChallengeDone: number;
  mobilityChallengeDone: number;
}

export interface StatisticsData {
  ChallengeOverview: ChallengeOverview;
  goalTracking: GoalTracking;
  growtgGraph: GrowthGraph;
  ecoImpact: EcoImpact[];
}

export interface StatisticsResponse {
  status: string;
  message: string;
  data: StatisticsData;
}

export interface myProfileState {
  myProfile: ProfileData | null;
  statistics: StatisticsData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
