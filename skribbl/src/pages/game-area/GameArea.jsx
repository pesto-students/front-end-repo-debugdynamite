import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/UserContext";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Board from "./components/board";
import Header from "./components/header/Header";
import InGameLeaderboardCard from "./components/in-game-leaderboard-card";

function GameArea() {
  const { user } = UserAuth();

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [users, setUsers] = useState([]);
  const [joined, setJoined] = useState(false);

  const handleJoin = async () => {
    if (user && !socket) {
      const token = await user.getIdToken();

      // Connect to the server with the token as part of the authentication
      const newSocket = io("http://localhost:3001/", {
        transports: ["websocket", "polling"],
        auth: {
          token,
        },
      });

      newSocket.connect();

      setSocket(newSocket);
      setJoined(true);
    }
  };

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the server
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for user join messages
      socket.on("userJoined", (username) => {
        console.log("user joined: ", username);
        setUsers((prevUsers) => [...prevUsers, username]);
      });

      // Listen for user leave messages
      socket.on("userLeft", (username) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user !== username));
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(); // Call your sendMessage function here
    }
  };

  const renderInGameLeaderBoard = () => {
    return <InGameLeaderboardCard />;
  };

  const renderMessages = () => {
    return (
      <div className="overflow-y-auto max-h-48">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.content}
          </div>
        ))}
      </div>
    );
  };

  const renderSendMessage = () => {
    return (
      <div className="flex items-center p-1 bg-gray-100 overflow-x-auto min-w-0">
        <input
          type="text"
          className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-shrink-0"
          placeholder="Start guessing..."
          onKeyPress={handleKeyPress}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="flex-shrink-0 px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-blue-600 focus:outline-none"
          type="button"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    );
  };

  if (!joined) {
    return <button onClick={handleJoin}>Join</button>;
  }

  return (
    <>
      <Header />
      <Board socket={socket} />
      <div className="flex w-full">
        <div className="flex-1">{renderInGameLeaderBoard()}</div>
        <div className="flex-1">{renderMessages()}</div>
      </div>
      {renderSendMessage()}
    </>
  );
}

export default GameArea;
