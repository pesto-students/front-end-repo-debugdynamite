import React from "react";
import RecentGames from "../../composite-components/recent-games/RecentGames";
import BackButton from "../../components/back-button/BackButton";
import { DASHBOARD_ROUTE } from "../../constants/routes";
import { UserAuth } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

const fetchUserGames = async (userId) => {
  const { data } = await axios.get("/user/" + userId + "/games");
  return data;
};

const backButtonClassName = "m-4";

function AllGames() {
  const { user } = UserAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user_games", user.uid],
    queryFn: () => fetchUserGames(user.uid),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const renderRecentGames = () => {
    return (
      <RecentGames
        recentGames={data}
        shouldRenderSeeAll={false}
        header="All games"
      />
    );
  };
  const renderBackButton = () => {
    return (
      <div className={backButtonClassName}>
        <BackButton target={DASHBOARD_ROUTE} color="black" />
      </div>
    );
  };
  return (
    <div>
      {renderBackButton()}
      <br />
      {renderRecentGames()}
    </div>
  );
}

export default AllGames;
