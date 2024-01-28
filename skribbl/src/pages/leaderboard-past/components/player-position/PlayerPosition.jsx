import React from "react";
import { getPositionSuffix } from "../../../../utils";

const headerClassName = "flex justify-center font-bold";

function PlayerPosition({ position }) {
  return (
    <>
      <div className={headerClassName}>POSITION</div>
      <div className="flex justify-center">
        <div className="font-bold text-8xl">{position}</div>
        <div className="font-bold text-2xl mt-3">
          {getPositionSuffix(position)}
        </div>
      </div>
    </>
  );
}

export default PlayerPosition;
