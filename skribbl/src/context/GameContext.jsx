import { useContext, createContext, useEffect, useState } from "react";
import { SocketConnection } from "./SocketContext";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [hostUser, setHostUser] = useState();

  const { socket } = SocketConnection();

  useEffect(() => {
    if (socket) {
      socket.on("roomCreated", (roomCode) => {
        setRoomCode(roomCode);
      });

      socket.on("roomJoined", (roomCode) => {
        setRoomCode(roomCode);
      });

      socket.on("hostUser", (user) => {
        console.log("host user inside user context: ", user);
        setHostUser(user);
      });
    }
  }, [socket]);

  return (
    <GameContext.Provider
      value={{
        roomCode,
        connectedUsers,
        setConnectedUsers,
        selectedUser,
        setSelectedUser,
        hostUser,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const GameState = () => {
  return useContext(GameContext);
};
