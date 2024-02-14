import React, { useEffect, useRef, useState } from "react";
import { SocketConnection } from "../../../../context/SocketContext";
import DrawingBoard from "./DrawingBoard";
import "./style.css";
import { UserAuth } from "../../../../context/UserContext";
import { GameState } from "../../../../context/GameContext";

const BoardContainer = () => {
  const { socket } = SocketConnection();

  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("5");

  const { user } = UserAuth();
  const { setConnectedUsers, selectedUser, setSelectedUser } = GameState();

  const canvasRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("connectedUsers", (userSockets) => {
        setConnectedUsers(userSockets);
        socket.emit("canvas-data", canvasRef.current?.toDataURL("image/png"));
      });

      socket.on("userSelected", (userSocket) => {
        setSelectedUser(userSocket);
      });
    }
  }, [setConnectedUsers, socket]);

  const changeColor = (event) => {
    setColor(event.target.value);
  };

  const changeSize = (event) => {
    setSize(event.target.value);
  };

  const renderBoard = () => {
    return (
      <div className="board-container">
        <DrawingBoard
          color={color}
          size={size}
          selectedUser={selectedUser}
          socket={socket}
          ref={canvasRef}
        ></DrawingBoard>
      </div>
    );
  };

  const renderBrush = () => {
    if (!selectedUser || (selectedUser && selectedUser.uid !== user.uid)) {
      return null;
    }
    return (
      <div className="tools-section mb-4">
        <div className="color-picker-container">
          Color : &nbsp;
          <input type="color" value={color} onChange={changeColor} />
        </div>

        <div className="brushsize-container">
          Size : &nbsp;
          <select value={size} onChange={changeSize}>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <>
      {renderBoard()}
      {renderBrush()}
    </>
  );
};

export default BoardContainer;
