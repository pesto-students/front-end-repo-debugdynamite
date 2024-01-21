import { Avatar } from "flowbite-react";
import React from "react";

const headerClassName = "flex justify-center m-4 font-bold text-lg";

function TopPlayers({ leaderboardData, displayPlayersMaxLength = 3 }) {
  let players = leaderboardData.playersInfo;
  let totalPlayers = players.length;
  let displayPlayers = players.slice(
    0,
    Math.min(displayPlayersMaxLength, totalPlayers)
  );
  return (
    <>
      <div className={headerClassName}>LEADERBOARD</div>
      <div className="flex justify-center">
        {displayPlayers.map((player) => (
          <div className="mx-6 flex flex-col items-center">
            <Avatar img={player.image} rounded size="lg" />
            <div className="text-center mt-2 font-bold">{player.position}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopPlayers;
