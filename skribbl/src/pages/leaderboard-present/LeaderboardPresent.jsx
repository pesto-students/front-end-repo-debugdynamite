import { leaderboardData } from "./mockData";
import Hero from "../../composite-components/hero/Hero";
import TopPlayers from "./components/top-players/TopPlayers";
import PlayersList from "../../composite-components/players-list/PlayersList";

function LeaderboardPresent() {
  const renderHero = () => {
    return (
      <Hero entryFees={leaderboardData.entryFees}>
        <TopPlayers leaderboardData={leaderboardData} />
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
