import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const fetchUserData = async (userId) => {
  const { data } = await axios.get(`/user/${userId}`);
  return data;
};

export const useUserData = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId),
  });
};
