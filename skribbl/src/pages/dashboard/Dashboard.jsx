import React from "react";
import UserActionButton from "./components/user-action-button/UserActionButton";
import Button from "../../components/button/Button";
import { actionButtons } from "./consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import RecentGames from "../../composite-components/recent-games/RecentGames";
import { useUserGamesData } from "../../api/hooks/";

function Dashboard() {
  const handlePlay = () => {
    alert("Not Implemented!");
  };

  const { data, error, isLoading } = useUserGamesData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const renderLogo = () => {
    return <div className="m-4 font-bold text-2xl">Skribbl</div>;
  };

  const renderWalletBalance = () => {
    return (
      <div className="flex flex-col items-center justify-center m-6">
        <div className="text-gray-400">WALLET BALANCE</div>
        <div className="flex items-top">
          <FontAwesomeIcon icon={faIndianRupeeSign} className="mt-2 ml-0.5" />
          <span className="text-4xl font-bold ml-1">265</span>
        </div>
      </div>
    );
  };

  const renderUserActionButtons = () => {
    return (
      <div className="flex justify-center items-center m-8">
        {actionButtons.map((actionButton) => (
          <UserActionButton
            key={actionButton.id}
            icon={process.env.PUBLIC_URL + actionButton.icon}
            label={actionButton.label}
            backgroundColor={actionButton.backgroundColor}
          />
        ))}
      </div>
    );
  };

  const renderRecentGames = () => {
    return (
      <RecentGames
        recentGames={data}
        header="Recent games"
        numberOfGamesToRender={4}
      />
    );
  };

  const renderPlayButton = () => {
    return (
      <div className="flex justify-center items-center my-8">
        <Button onClick={handlePlay}>PLAY</Button>
      </div>
    );
  };

  return (
    <div>
      {renderLogo()}
      {renderWalletBalance()}
      {renderUserActionButtons()}
      {renderRecentGames()}
      {renderPlayButton()}
    </div>
  );
}

export default Dashboard;
