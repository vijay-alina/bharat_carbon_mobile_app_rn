export interface ChallengeRecordType {
  _id: string;
  studentId: string;
  schoolCollegeId: string;
  consumed: number;
  unit: string;
  waterSource: number;
  notes: string;
  image: string[];
  isDeleted: boolean;
  date: string;
}

export interface InstructionTips {
  Avoid: string;
  Do: string;
  Focus: string;
}

export interface OngoingChallenge {
  _id: string;
  category: string;
  studentId: string;
  schoolCollegeId: string;
  startDate: string;
  endDate: string;
  days: number;
  point: number;
  challengeRecord?: ChallengeRecordType[];
  tips: InstructionTips;
  isDeleted: boolean;
  isGoingOn: boolean;
}

export interface ChallengePaylodType {
  startDate: string;
  endDate: string;
  days: number;
  point: number;
  challangeType: string;
}

export interface ManageChallengeState {
  ongoingChallenge: OngoingChallenge[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AcceptChallengeResponse {
  status: string;
  message: string;
  data: OngoingChallenge;
}

export interface GetOngoingChallegeInfoResponse {
  status: string;
  message: string;
  data: OngoingChallenge[];
}
