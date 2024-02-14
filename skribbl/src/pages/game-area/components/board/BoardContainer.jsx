import React, { useEffect, useRef, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import "./style.css";

const BoardContainer = ({ socket }) => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("5");

  const [connectedUsers, setConnectedUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("connectedUsers", (users) => {
        setConnectedUsers(users);
        socket.emit("canvas-data", canvasRef.current.toDataURL("image/png"));
      });

      socket.on("userSelected", (user) => {
        setSelectedUser(user);
      });
    }
  }, [setConnectedUsers, socket]);

  const changeColor = (event) => {
    setColor(event.target.value);
  };

  const changeSize = (event) => {
    setSize(event.target.value);
  };

  const handleUserSelection = (user) => {
    socket.emit("selectUser", user);
  };

  let connectedUsersList = [];
  Object.keys(connectedUsers).forEach((user) =>
    connectedUsersList.push(
      <div key={connectedUsers[user].userName}>
        <button onClick={() => handleUserSelection(connectedUsers[user])}>
          {connectedUsers[user].userName}
        </button>
      </div>
    )
  );

  const renderBoard = () => {
    return (
      <div className="board-container">
        <DrawingBoard
          color={color}
          size={size}
          setConnectedUsers={setConnectedUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          socket={socket}
          ref={canvasRef}
        ></DrawingBoard>
      </div>
    );
  };

  const renderConnectedUsers = () => {
    return (
      <div>
        <div>Connected Users</div>
        <div>{connectedUsersList}</div>
      </div>
    );
  };

  const renderBrush = () => {
    if (
      !selectedUser ||
      (selectedUser && selectedUser.socketId !== socket.id)
    ) {
      return null;
    }
    return (
      <div className="tools-section">
        <div className="color-picker-container">
          Select Brush Color : &nbsp;
          <input type="color" value={color} onChange={changeColor} />
        </div>

        <div className="brushsize-container">
          Select Brush Size : &nbsp;
          <select value={size} onChange={changeSize}>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderBoard()}
      {renderConnectedUsers()}
      {renderBrush()}
    </>
  );
};

export default BoardContainer;
