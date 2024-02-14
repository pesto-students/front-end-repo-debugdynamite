import React from "react";
import { Modal, Button } from "flowbite-react";
import { SocketConnection } from "../../../../context/SocketContext";

const WordModal = ({
  words,
  isOpen,
  onClose,
  selectedOption,
  setSelectedOption,
}) => {
  const { socket } = SocketConnection();

  const handleModalClose = () => {
    setSelectedOption(null);
    onClose();
  };

  console.log("selected option: ", selectedOption);

  const handleOptionSelect = (option) => {
    console.log("word selected: ", option);
    setSelectedOption(option);
    handleModalClose();
    socket.emit("wordSelected", option);
  };

  const renderModalBody = () => {
    return (
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        {words.map((word) => (
          <Button
            onClick={() => handleOptionSelect(word)}
            active={selectedOption === word}
            className="m-2 bg-gray-900"
          >
            {word}
          </Button>
        ))}
      </Modal.Body>
    );
  };

  const renderModalHeader = () => {
    return (
      <Modal.Header>
        <h2>Select Word</h2>
      </Modal.Header>
    );
  };

  return (
    <>
      <Modal show={isOpen} onClose={handleModalClose}>
        {renderModalHeader()}
        {renderModalBody()}
      </Modal>
    </>
  );
};

export default WordModal;
