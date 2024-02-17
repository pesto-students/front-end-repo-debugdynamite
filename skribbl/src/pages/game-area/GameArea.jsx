import React, { useEffect, useRef, useState } from "react";
import { SocketConnection } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Board from "./components/board";
import Header from "./components/header/Header";
import InGameLeaderboard from "./components/in-game-leaderboard";
import WordModal from "./components/words-modal";
import ScoreModal from "./components/scores-modal";
import { UserAuth } from "../../context/UserContext";
import { GameState } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import { getPresentLeaderBoardRoute } from "../../constants/routes";

function generateLeaderboardArray(userScores, connectedUsers) {
  let scores = userScores;
  if (scores.length === 0) {
    scores = connectedUsers.map((user) => {
      return { userId: user.uid, score: 0 };
    });
  }

  const sortedUserScores = scores.sort((a, b) => b.score - a.score);

  const result = sortedUserScores.map((userScore, index) => {
    const connectedUser = connectedUsers.find(
      (user) => user.uid === userScore.userId
    );
    return {
      id: userScore.userId,
      name: connectedUser ? connectedUser.name : "Unknown",
      position: index + 1,
      points: userScore.score,
    };
  });

  return result;
}

function GameArea() {
  const navigate = useNavigate();
  const { socket } = SocketConnection();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [roomCode, setRoomCode] = useState();
  const [wordOptions, setWordOptions] = useState([]);
  const { user } = UserAuth();
  const { connectedUsers, setSelectedUser, hostUser } = GameState();

  const [isWordsModalOpen, setIsWordsModalOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [userScores, setUserScores] = useState([]);

  const selectedUserRef = useRef();

  const handleCloseWordModal = () => {
    setIsWordsModalOpen(false);
  };

  const handleCloseScoreModal = () => {
    setIsScoreModalOpen(false);
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the server
      if (hostUser.uid === user.uid) {
        socket.emit("startRound");
      }

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("roomCreated", (roomCode) => {
        setRoomCode(roomCode);
      });

      socket.on("wordOptions", (wordOptions) => {
        if (selectedUserRef.current && user.uid !== selectedUserRef.current.uid)
          return;
        setWordOptions(wordOptions);
        setIsWordsModalOpen(true);
      });

      socket.on("endGame", (gameId) => {
        navigate(getPresentLeaderBoardRoute(gameId));
      });

      socket.on("userSelected", (user) => {
        setSelectedUser(user);
        selectedUserRef.current = user;
      });

      socket.on("scores", (scores) => {
        const userScores = [];
        Object.keys(scores).forEach((userId) => {
          userScores.push({ userId, score: scores[userId] });
        });
        setUserScores(userScores);
        setIsScoreModalOpen(true);
        setTimeout(() => {
          setIsScoreModalOpen(false);
          if (selectedUserRef.current?.uid === user?.uid) {
            socket.emit("startRound");
          }
        }, 2000);
      });
    }
  }, []);

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
    return (
      <InGameLeaderboard
        playersPositionData={generateLeaderboardArray(
          userScores,
          connectedUsers
        )}
      />
    );
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
          onChange={(e) => handleInputChange(e)}
          disabled={
            selectedUserRef.current && selectedUserRef.current.uid === user.uid
          }
        />
        <button
          className="flex-shrink-0 px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-blue-600 focus:outline-none"
          type="button"
          onClick={sendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    );
  };

  const renderLeaderBoardAndMessages = () => {
    return (
      <div className="flex w-full">
        <div className="flex-1">{renderInGameLeaderBoard()}</div>
        <div className="flex-1">{renderMessages()}</div>
      </div>
    );
  };

  const renderWordModal = () => {
    return (
      <WordModal
        words={wordOptions}
        isOpen={isWordsModalOpen}
        onClose={handleCloseWordModal}
        selectedOption={selectedWord}
        setSelectedOption={setSelectedWord}
      />
    );
  };

  const renderScoresModal = () => {
    return (
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={handleCloseScoreModal}
        userScores={userScores}
        timeoutDuration={5000} // 5000 milliseconds (5 seconds)
      />
    );
  };

  return (
    <>
      <Header roomCode={roomCode} />
      <Board />
      {renderLeaderBoardAndMessages()}
      {renderSendMessage()}
      {renderWordModal()}
      {renderScoresModal()}
    </>
  );
}

export default GameArea;
