import React from "react";
import { getPositionSuffix } from "../../../../utils";

function Header() {
  const renderTime = () => {
    return (
      <div className="flex-shrink-0">
        <span className="font-bold text-lg">12s</span>
      </div>
    );
  };

  const renderWordPlaceholder = () => {
    return (
      <div className="flex-grow text-center">
        <span className="font-bold text-xl">_ _ _ _ 4</span>
      </div>
    );
  };

  const renderRoundNumber = () => {
    const position = 1;

    return (
      <div className="text-center">
        <div className="flex">
          <div className="font-bold text-lg">{position}</div>
          <div className="font-bold text-lg">{getPositionSuffix(position)}</div>
        </div>
        <div className="font-bold text-sm">round</div>
      </div>
    );
  };

  return (
    <header className="bg-gray-900 text-white p-2.5">
      <div className="flex items-center justify-between">
        {renderTime()}
        {renderWordPlaceholder()}
        {renderRoundNumber()}
      </div>
    </header>
  );
}

export default Header;
