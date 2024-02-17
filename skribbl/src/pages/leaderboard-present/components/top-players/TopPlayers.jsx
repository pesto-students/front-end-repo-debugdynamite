import { Avatar } from "flowbite-react";
import React from "react";
import { getPositionSuffix } from "../../../../utils";
import { leaderboardReader, playersInfoReader } from "../../../../readers";

const headerClassName = "flex justify-center m-4 font-bold text-lg";

function TopPlayers({ leaderboardData, displayPlayersMaxLength = 3 }) {
  let players = leaderboardReader.playersInfo(leaderboardData);
  let totalPlayers = players.length;
  let displayPlayers = players.slice(
    0,
    Math.min(displayPlayersMaxLength, totalPlayers)
  );
  return (
    <>
      <div className={headerClassName}>LEADERBOARD</div>
      <div className="flex justify-center">
        {displayPlayers.map((player, index) => (
          <div key={index} className="mx-6 flex flex-col items-center">
            <Avatar
              img={playersInfoReader.profileUrl(player)}
              rounded
              size="lg"
            />
            <div className="text-center mt-2 font-bold">
              {playersInfoReader.rank(player) +
                getPositionSuffix(playersInfoReader.rank(player))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopPlayers;
