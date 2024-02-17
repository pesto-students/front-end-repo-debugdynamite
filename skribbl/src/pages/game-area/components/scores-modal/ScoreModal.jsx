import React from "react";
import { Modal } from "flowbite-react";
import { GameState } from "../../../../context/GameContext";

const ScoreModal = ({ userScores, isOpen, onClose }) => {
  const { connectedUsers } = GameState();

  const resultMap = connectedUsers.reduce((result, { uid, name }) => {
    result[uid] = name;
    return result;
  }, {});

  const handleModalClose = () => {
    onClose();
  };

  const renderModalBody = () => {
    return (
      <Modal.Body>
        {userScores.map((user) => (
          <div
            key={user.userId}
            className="flex justify-between items-center p-2"
          >
            <span>{resultMap[user.userId]}</span>
            <span>{user.score}</span>
          </div>
        ))}
      </Modal.Body>
    );
  };

  const renderModalHeader = () => {
    return (
      <Modal.Header>
        <h2>User Scores</h2>
      </Modal.Header>
    );
  };

  return (
    <Modal show={isOpen} onClose={handleModalClose}>
      {renderModalHeader()}
      {renderModalBody()}
    </Modal>
  );
};

export default ScoreModal;
