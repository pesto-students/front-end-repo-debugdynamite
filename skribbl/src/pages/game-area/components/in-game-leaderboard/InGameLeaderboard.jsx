import React from "react";
import PlayerPositionCard from "./PlayerPositionCard";
import List from "../../../../components/list/List";

function InGameLeaderboard({ playersPositionData }) {
  return (
    <List
      dataSource={playersPositionData}
      renderItem={(playerPositionData, index) => (
        <PlayerPositionCard
          key={index}
          position={playerPositionData.position}
          name={playerPositionData.name}
          points={playerPositionData.points}
          isBgGrey={index % 2}
        />
      )}
    />
  );
}

export default InGameLeaderboard;
