import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { UserAuth } from "./context/UserContext";

const ChatComponent = () => {
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
    // Send the message to the server
    if (socket && messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      {!joined && <button onClick={handleJoin}>Join</button>}

      {joined && (
        <div>
          <div>
            <div>
              <strong>Users online:</strong> {users.join(", ")}
            </div>
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.user}:</strong> {message.content}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
