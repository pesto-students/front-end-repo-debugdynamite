import React from "react";
import RecentGames from "../../composite-components/recent-games/RecentGames";
import { recentGames } from "../dashboard/mockData";
import BackButton from "../../components/back-button/BackButton";
import { DASHBOARD_URI } from "../../constants/routeContants";

const backButtonClassName = "m-4";

function AllGames() {
  const renderRecentGames = () => {
    return (
      <RecentGames
        recentGames={recentGames}
        shouldRenderSeeAll={false}
        header="All games"
      />
    );
  };
  const renderBackButton = () => {
    return (
      <div className={backButtonClassName}>
        <BackButton target={DASHBOARD_URI} color="black" />
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
