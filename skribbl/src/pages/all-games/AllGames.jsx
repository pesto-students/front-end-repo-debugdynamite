import React from "react";
import RecentGames from "../../composite-components/recent-games/RecentGames";
import BackButton from "../../components/back-button/BackButton";
import { DASHBOARD_ROUTE } from "../../constants/routes";
import { UserAuth } from "../../context/AuthContext";
import { getUserGamesURI } from "../../constants/endPoints";
import { useQuery } from "@tanstack/react-query";
import getDataPrivate from "../../services/getDataPrivate";

const backButtonClassName = "m-4";

function AllGames() {
  const { user } = UserAuth();
  const USER_GAMES_URI = getUserGamesURI(user.uid);

  const { data, error, isLoading } = useQuery({
    queryKey: [USER_GAMES_URI],
    queryFn: () => getDataPrivate(USER_GAMES_URI, user),
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
