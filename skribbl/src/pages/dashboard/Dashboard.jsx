import React from "react";
import UserActionButton from "./components/user-action-button/UserActionButton";
import Button from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import RecentGames from "../../composite-components/recent-games/RecentGames";
import { useUserGamesData } from "../../api/hooks/";
import { useNavigate } from "react-router-dom";
import { JOIN_GAME_ROUTE, getUserProfileRoute } from "../../constants/routes";
import { useUserData } from "../../api/hooks/useUserData";
import { UserAuth } from "../../context/UserContext";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = UserAuth();

  const { data, error, isLoading } = useUserGamesData();
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useUserData(user.uid);

  if (isLoading || userIsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  console.log({ userData });

  const actionButtons = [
    {
      id: 1,
      icon: "/cashout.png",
      label: "Cash Out",
      backgroundColor: "bg-purple-100",
      onClick: () => {
        alert("Not Implemented!");
      },
    },
    {
      id: 2,
      icon: "/addmoney.png",
      label: "Add Money",
      backgroundColor: "bg-blue-100",
      onClick: () => {
        alert("Not Implemented!");
      },
    },
    {
      id: 3,
      icon: "/profile.png",
      label: "Account",
      backgroundColor: "bg-green-100",
      onClick: () => {
        navigate(getUserProfileRoute(user.uid));
      },
    },
  ];

  const handlePlay = () => {
    navigate(JOIN_GAME_ROUTE);
  };

  const renderLogo = () => {
    return <div className="m-4 font-bold text-2xl">Skribbl</div>;
  };

  const renderWalletBalance = () => {
    return (
      <div className="flex flex-col items-center justify-center m-6">
        <div className="text-gray-400">WALLET BALANCE</div>
        <div className="flex items-top">
          <FontAwesomeIcon icon={faIndianRupeeSign} className="mt-2 ml-0.5" />
          <span className="text-4xl font-bold ml-1">
            {userData?.wallet_balance}
          </span>
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
            onClick={actionButton.onClick}
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
        <Button
          isRounded
          textSize="2xl"
          paddingX="8"
          paddingY="2"
          onClick={handlePlay}
        >
          PLAY
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className="h-[80vh]">
        {renderLogo()}
        {renderWalletBalance()}
        {renderUserActionButtons()}
        {renderRecentGames()}
      </div>
      {renderPlayButton()}
    </>
  );
}

export default Dashboard;
