import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import { UserAuth } from "../../context/AuthContext";

const fetchUserGames = async (userId) => {
  const { data } = await axios.get(`/user/${userId}/games`);
  return data;
};

export const useUserGamesData = () => {
  const { user } = UserAuth();
  return useQuery({
    queryKey: ["user_games", user.uid],
    queryFn: () => fetchUserGames(user.uid),
  });
};
