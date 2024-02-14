import React from "react";

const headerClassName =
  "flex flex-col justify-center items-center m-8 font-bold text-lg";

function GameCode({ gameCode }) {
  return (
    <div className={headerClassName}>
      <div>Game Code:</div>
      <div className="text-4xl">{gameCode}</div>
    </div>
  );
}

export default GameCode;
