import React, { useEffect } from "react";
import PlayersList from "../../composite-components/players-list/PlayersList";
import Hero from "../../composite-components/hero/Hero";
import GameCode from "./components/GameCode";
import { GameState } from "../../context/GameContext";
import Button from "../../components/button";
import { SocketConnection } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { GAME_AREA_ROUTE } from "../../constants/routes";
import { UserAuth } from "../../context/UserContext";

function GameLobby() {
  const { user } = UserAuth();
  const { connectedUsers, roomCode, hostUser } = GameState();
  const { socket } = SocketConnection();
  const navigate = useNavigate();

  const playersInfo = connectedUsers.map((user) => ({
    name: user?.name,
    profile_url: user?.picture,
  }));

  useEffect(() => {
    socket.on("gameStarted", () => {
      navigate(GAME_AREA_ROUTE);
    });
  }, [socket, navigate]);

  const renderHero = () => {
    return (
      <Hero entryFees={10}>
        <GameCode gameCode={roomCode} />
      </Hero>
    );
  };

  const renderPlayerList = () => {
    return <PlayersList playersInfo={playersInfo} shouldRenderHeader={false} />;
  };

  const handleStartGame = () => {
    socket.emit("startGame");
  };

  const renderStartGame = () => {
    return (
      <Button paddingX={4} paddingY={2} onClick={handleStartGame}>
        Start Game
      </Button>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <div>
          {renderHero()}
          {renderPlayerList()}
        </div>
        {(!hostUser || hostUser.uid === user.uid) && renderStartGame()}
      </div>
    </>
  );
}

export default GameLobby;
