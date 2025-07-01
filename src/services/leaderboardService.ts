import {LeaderboardResponse} from '../features/leaderboard/leaderboardType';
import apiClient from './apiClient';

export const getLeaderboardData = async (): Promise<LeaderboardResponse> => {
  const response = await apiClient.post(`/leaderboard`);
  return response.data;
};
