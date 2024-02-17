import React, { useEffect, useState } from "react";
import { getPositionSuffix } from "../../../../utils";
import { SocketConnection } from "../../../../context/SocketContext";

function Header() {
  const { socket } = SocketConnection();
  const [time, setTime] = useState(0);
  const [selectedWordLength, setSelectedWordLength] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("timerUpdate", (timerValue) => {
        setTime(timerValue);
      });

      socket.on("selectedWordLength", (selectedWordLength) => {
        setSelectedWordLength(selectedWordLength);
      });
    }
  }, [socket]);

  const renderTime = () => {
    return (
      <div className="flex-shrink-0">
        <span className="font-bold text-lg">{time}s</span>
      </div>
    );
  };

  const renderWordPlaceholder = () => {
    if (selectedWordLength > 0) {
      return (
        <div className="flex-grow text-center">
          <span className="font-bold text-xl">
            {"_ ".repeat(Number(selectedWordLength))} {selectedWordLength}
          </span>
        </div>
      );
    }
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
