import {challengesStatus} from '../constants/constants';
import {
  AcceptChallengeResponse,
  ChallengeListResponse,
  ChallengePaylodType,
  GetChallengeQueryParamType,
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

export const GetChallengeStatusList = async (
  param: GetChallengeQueryParamType,
): Promise<ChallengeListResponse> => {
  const response = await apiClient.get(
    `/analytics/activity/challangeList/${param.currentYear}/${param.status}?page=${param.page}&limit=${param.limit}`,
  );
  // console.log('param', param);
  // const data = {
  //   status: 'success',
  //   message: '',
  //   data: challengesStatus,
  //   totalLength: 35,
  //   page: param.page,
  //   listType: param.status,
  // };

  return response.data;
};
