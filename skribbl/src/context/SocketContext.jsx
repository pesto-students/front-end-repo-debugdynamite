import { useContext, createContext, useEffect, useState } from "react";
import { UserAuth } from "./UserContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = UserAuth();

  const [socket, setSocket] = useState();

  useEffect(() => {
    if (user) {
      const token = user.accessToken;

      // Connect to the server with the token as part of the authentication
      const newSocket = io("http://localhost:3001/", {
        transports: ["websocket", "polling"],
        auth: {
          token,
        },
      });

      newSocket.connect();
      setSocket(newSocket);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketConnection = () => {
  return useContext(SocketContext);
};
