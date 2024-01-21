import React from "react";

const headerClassName = "flex justify-center font-bold";

function PlayerPosition({ position }) {
  return (
    <>
      <div className={headerClassName}>POSITION</div>
      <div className="flex justify-center">
        <div className="font-bold text-8xl">{position}</div>
        <div className="font-bold text-2xl mt-3">ND</div>
      </div>
    </>
  );
}

export default PlayerPosition;
