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
    onClose();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleModalClose();
    console.log("word selected option: ", option);
    socket.emit("wordSelected", option);
  };

  const renderModalBody = () => {
    return (
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        {words.map((word) => (
          <div key={word}>
            <Button
              onClick={() => handleOptionSelect(word)}
              active={selectedOption === word}
              className="m-2 bg-gray-900"
            >
              {word}
            </Button>
          </div>
        ))}
      </Modal.Body>
    );
  };

  const renderModalHeader = () => {
    return <Modal.Header>Select Word</Modal.Header>;
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
