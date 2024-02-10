import React from "react";
import PlayerPositionCard from "./PlayerPositionCard";
import List from "../../../../components/list/List";

const playersPositionData = [
  {
    position: 1,
    name: "Sai Chaitanya",
    points: 685,
  },
  {
    position: 2,
    name: "Swastik Sahoo",
    points: 500,
  },
  {
    position: 3,
    name: "Ayush Agrawal",
    points: 378,
  },
];

function InGameLeaderboard() {
  return (
    <List
      dataSource={playersPositionData}
      renderItem={(playerPositionData, index) => (
        <PlayerPositionCard
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
