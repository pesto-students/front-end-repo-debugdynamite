import React from "react";

function PlayerPositionCard({ position, name, points, isBgGrey }) {
  let cardClass = "flex items-center p-2";
  if (isBgGrey) {
    cardClass += " bg-gray-100";
  }
  return (
    <div className={cardClass}>
      <div className="font-bold text-xl">#{position}</div>
      <div className="flex-1 ml-4 text-center">
        <div className="font-bold">{name}</div>
        <div className="text-sm">{points} points</div>
      </div>
    </div>
  );
}

export default PlayerPositionCard;
