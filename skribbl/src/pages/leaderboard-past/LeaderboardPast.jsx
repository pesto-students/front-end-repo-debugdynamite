import Hero from "../../composite-components/hero/Hero";
import PlayersList from "../../composite-components/players-list/PlayersList";
import PlayerPosition from "./components/player-position/PlayerPosition";
import { UserAuth } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { leaderboardReader, playersInfoReader } from "../../readers";
import { useLeaderBoardData } from "../../api/hooks";

function getPlayerRank(data, playerId) {
  const player = leaderboardReader
    .playersInfo(data)
    .find((player) => playersInfoReader.playerId(player) === playerId);

  return player ? playersInfoReader.rank(player) : null;
}

function LeaderboardPast() {
  const { gameId } = useParams();

  const { user } = UserAuth();

  const { data, error, isLoading } = useLeaderBoardData(gameId);

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
    return <PlayersList playersInfo={leaderboardReader.playersInfo(data)} />;
  };

  return (
    <div>
      {renderHero()}
      {renderPlayerList()}
    </div>
  );
}

export default LeaderboardPast;
