import React, { useEffect, useState } from "react";
import { getPositionSuffix } from "../../../../utils";
import { SocketConnection } from "../../../../context/SocketContext";

function Header({ roomCode, selectedWord }) {
  const { socket } = SocketConnection();
  const [time, setTime] = useState();

  useEffect(() => {
    if (socket) {
      socket.on("timerUpdate", (timerValue) => {
        setTime(timerValue);
      });
    }
  }, [socket]);

  const renderTime = () => {
    return (
      <div className="flex-shrink-0">
        <span className="font-bold text-lg">
          {time}s - {roomCode}
        </span>
      </div>
    );
  };

  const renderWordPlaceholder = () => {
    let selectedWordLength = 0;
    console.log({ selectedWord });
    if (selectedWord && selectedWord.length > 0) {
      return (
        <div className="flex-grow text-center">
          <span className="font-bold text-xl">
            {"_ " * selectedWordLength} {selectedWordLength}
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
        <button onClick={() => socket.emit("startRound")}>Start Game</button>
      </div>
    </header>
  );
}

export default Header;
