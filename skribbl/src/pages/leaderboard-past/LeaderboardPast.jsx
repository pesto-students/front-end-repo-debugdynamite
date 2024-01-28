import Hero from "../../composite-components/hero/Hero";
import PlayersList from "../../composite-components/players-list/PlayersList";
import PlayerPosition from "./components/player-position/PlayerPosition";
import { UserAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { getLeaderBoardURI } from "../../constants/endPoints";
import { useQuery } from "@tanstack/react-query";
import getDataPrivate from "../../services/getDataPrivate";

function getPlayerRank(data, playerId) {
  // Find the player with the given playerId in the playersInfo array
  const player = data.playersInfo.find(
    (player) => player.playerId === playerId
  );

  // If the player is found, return their rank; otherwise, return null
  return player ? player.rank : null;
}

function LeaderboardPast() {
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
        <PlayerPosition position={getPlayerRank(data, user.uid)} />
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

export default LeaderboardPast;
