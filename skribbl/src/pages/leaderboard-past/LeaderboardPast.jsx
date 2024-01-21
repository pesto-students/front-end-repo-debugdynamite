import Hero from "../../composite-components/hero/Hero";
import { leaderboardData } from "../leaderboard-present/mockData";
import PlayersList from "../../composite-components/players-list/PlayersList";
import PlayerPosition from "./components/player-position/PlayerPosition";

function LeaderboardPresent() {
  const renderHero = () => {
    return (
      <Hero entryFees={leaderboardData.entryFees}>
        <PlayerPosition position="2" />
      </Hero>
    );
  };

  const renderPlayerList = () => {
    return <PlayersList playersInfo={leaderboardData.playersInfo} />;
  };

  return (
    <div>
      {renderHero()}
      {renderPlayerList()}
    </div>
  );
}

export default LeaderboardPresent;
