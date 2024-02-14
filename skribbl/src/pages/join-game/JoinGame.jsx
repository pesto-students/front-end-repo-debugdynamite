import React, { useEffect, useState } from "react";
import OTPInput from "../../composite-components/otp-input/OTPInput";
import BackButton from "../../components/back-button/BackButton";
import Button from "../../components/button";
import {
  DASHBOARD_ROUTE,
  GAME_DETAILS_ROUTE,
  GAME_LOBBY_ROUTE,
} from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { SocketConnection } from "../../context/SocketContext";
import { GameState } from "../../context/GameContext";

const backButtonClassName = "m-4";
const headingClassName = "font-bold text-xl";
const subHeadingClassName = "font-bold text-sm";

function JoinGame() {
  const navigate = useNavigate();
  const { socket } = SocketConnection();

  const { setConnectedUsers } = GameState();

  const [roomCodeValue, setRoomCodeValue] = useState();
  const [entryFees, setEntryFees] = useState();
  const [isCodeValidated, setIsCodeValidated] = useState(false);

  useEffect(() => {
    socket.on("roomCodeValidated", (entryFees) => {
      setEntryFees(entryFees);
      setIsCodeValidated(true);
    });

    socket.on("connectedUsers", (connectedUsers) => {
      setConnectedUsers(connectedUsers);
    });

    socket.on("invalidRoom", () => {
      alert("Invalid code: ", roomCodeValue);
    });
  }, [socket]);

  const handleOtpVerification = () => {
    socket.emit("validateRoomCode", roomCodeValue);
    console.log("otp verification called: ", roomCodeValue);
  };

  const handleProceed = () => {
    socket.emit("joinRoom", roomCodeValue);
    navigate(GAME_LOBBY_ROUTE);
  };

  const renderBackButton = () => {
    return (
      <div className={backButtonClassName}>
        <BackButton target={DASHBOARD_ROUTE} color="black" />
      </div>
    );
  };

  const renderOTPInput = () => {
    return <OTPInput length={6} setOtpValue={setRoomCodeValue} />;
  };

  const renderNewGameButton = () => {
    return (
      <Button
        paddingX="4"
        paddingY="1"
        textSize="lg"
        onClick={() => navigate(GAME_DETAILS_ROUTE)}
      >
        New Game
      </Button>
    );
  };

  const renderProceedButton = () => {
    return (
      <Button
        paddingX="4"
        paddingY="1"
        textSize="lg"
        onClick={() => handleProceed()}
      >
        Proceed
      </Button>
    );
  };

  const renderVerifyButton = () => {
    return (
      <Button
        isOutlined
        paddingX="3"
        textSize="lg"
        onClick={handleOtpVerification}
      >
        Verify
      </Button>
    );
  };

  const renderHeading = () => {
    return <div className={headingClassName}>Enter Game Code</div>;
  };

  const renderSubHeading = () => {
    return (
      <div className={subHeadingClassName}>Entry Fees: Rs. {entryFees}</div>
    );
  };

  const renderVerifiedTag = () => {
    return (
      <span className="inline-block bg-green-500 text-white py-1 px-2 rounded-full text-xs font-bold uppercase">
        Verified
      </span>
    );
  };

  return (
    <>
      {renderBackButton()}
      <div className="flex flex-col items-center justify-between h-[85vh] m-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center">
            {renderHeading()}
            {isCodeValidated && renderSubHeading()}
          </div>
          {renderOTPInput()}
          {isCodeValidated && renderVerifiedTag()}
          {!isCodeValidated && renderVerifyButton()}
        </div>
        {isCodeValidated ? renderProceedButton() : renderNewGameButton()}
      </div>
    </>
  );
}

export default JoinGame;
