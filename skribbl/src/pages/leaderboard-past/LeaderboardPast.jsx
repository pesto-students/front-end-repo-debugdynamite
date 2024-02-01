import Hero from "../../composite-components/hero/Hero";
import PlayersList from "../../composite-components/players-list/PlayersList";
import PlayerPosition from "./components/player-position/PlayerPosition";
import { UserAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { leaderboardReader, playersInfoReader } from "../../readers";

import axios from "../../api/axios";

function getPlayerRank(data, playerId) {
  // Find the player with the given playerId in the playersInfo array
  const player = leaderboardReader
    .playersInfo(data)
    .find((player) => playersInfoReader.playerId(player) === playerId);

  // If the player is found, return their rank; otherwise, return null
  return player ? playersInfoReader.rank(player) : null;
}

const fetchLeaderboardData = async (gameId) => {
  const { data } = await axios.get("/game/" + gameId + "/leaderboard");
  return data;
};

function LeaderboardPast() {
  const { gameId } = useParams();

  const { user } = UserAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["leaderboard", gameId],
    queryFn: () => fetchLeaderboardData(gameId),
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
