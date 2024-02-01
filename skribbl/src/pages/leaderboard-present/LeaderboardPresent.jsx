import Hero from "../../composite-components/hero/Hero";
import TopPlayers from "./components/top-players/TopPlayers";
import PlayersList from "../../composite-components/players-list/PlayersList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { leaderboardReader } from "../../readers";

import axios from "../../api/axios";

const fetchLeaderboardData = async (gameId) => {
  const { data } = await axios.get("/game/" + gameId + "/leaderboard");
  return data;
};

function LeaderboardPresent() {
  const { gameId } = useParams();

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
      <Hero entryFees={leaderboardReader.entryFees(data)}>
        <TopPlayers leaderboardData={data} />
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

export default LeaderboardPresent;
