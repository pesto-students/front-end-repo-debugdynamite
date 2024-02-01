import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const fetchLeaderboardData = async (gameId) => {
  const { data } = await axios.get(`/game/${gameId}/leaderboard`);
  return data;
};

export const useLeaderBoardData = (gameId) => {
  return useQuery({
    queryKey: ["leaderboard", gameId],
    queryFn: () => fetchLeaderboardData(gameId),
  });
};
