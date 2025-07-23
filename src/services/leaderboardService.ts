import {
  FamilyLeaderboardResponse,
  LeaderboardResponse,
} from '../features/leaderboard/leaderboardType';
import apiClient from './apiClient';

export const getLeaderboardData = async (
  year: number,
): Promise<LeaderboardResponse> => {
  const response = await apiClient.get(`/analytics/board/${year}/all`);
  return response.data;
};

export const getFamilyLeaderboardData =
  async (): Promise<FamilyLeaderboardResponse> => {
    const response = await apiClient.get(`/analytics/familyBoard`);
    return response.data;
  };
