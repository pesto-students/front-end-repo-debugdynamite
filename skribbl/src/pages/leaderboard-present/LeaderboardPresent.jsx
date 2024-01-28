import Hero from "../../composite-components/hero/Hero";
import TopPlayers from "./components/top-players/TopPlayers";
import PlayersList from "../../composite-components/players-list/PlayersList";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { getLeaderBoardURI } from "../../constants/endPoints";
import { useQuery } from "@tanstack/react-query";
import getDataPrivate from "../../services/getDataPrivate";

function LeaderboardPresent() {
  const { gameId } = useParams();

  const { user } = UserAuth();
  const LEADERBOARD_URI = getLeaderBoardURI(gameId);

  const { data, error, isLoading } = useQuery({
    queryKey: [LEADERBOARD_URI],
    queryFn: () => getDataPrivate(LEADERBOARD_URI, user),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const renderHero = () => {
    return (
      <Hero entryFees={data.entryFees}>
        <TopPlayers leaderboardData={data} />
      </Hero>
    );
  };

  const renderPlayerList = () => {
    return <PlayersList playersInfo={data.playersInfo} />;
  };

  return (
    <div>
      {renderHero()}
      {renderPlayerList()}
    </div>
  );
}

export default LeaderboardPresent;
