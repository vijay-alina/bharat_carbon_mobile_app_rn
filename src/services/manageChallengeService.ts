import {
  AcceptChallengeResponse,
  ChallengePaylodType,
  GetOngoingChallegeInfoResponse,
} from '../features/manageChallege/manageChallengeType';
import apiClient from './apiClient';

export const GetOngoingChallegeInfo = async (
  challangeType: string,
): Promise<GetOngoingChallegeInfoResponse> => {
  const response = await apiClient.get(
    `/housingChallenge/filter/${challangeType}`,
  );
  return response.data;
};

export const AcceptChallenge = async (
  payload: ChallengePaylodType,
): Promise<AcceptChallengeResponse> => {
  const challangeType = payload.challangeType;
  const data = {
    startDate: payload.startDate,
    endDate: payload.endDate,
    days: payload.days,
    point: payload.point,
  };

  const response = await apiClient.post(
    `/housingChallenge/${challangeType}`,
    data,
  );

  return response.data;
};
