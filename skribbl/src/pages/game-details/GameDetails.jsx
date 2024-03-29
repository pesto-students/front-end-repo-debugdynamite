import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import BackButton from "../../components/back-button/BackButton";
import { GAME_LOBBY_ROUTE, JOIN_GAME_ROUTE } from "../../constants/routes";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { SocketConnection } from "../../context/SocketContext";
import { UserAuth } from "../../context/UserContext";

const headingClassName = "font-bold text-xl mb-8";
const backButtonClassName = "m-4";

function GameDetails() {
  const navigate = useNavigate();
  const { socket } = SocketConnection();
  const { user } = UserAuth();

  const [entryFees, setEntryFees] = useState("");
  const [roundDuration, setRoundDuration] = useState("");

  const handleEntryFeesChange = (e) => {
    setEntryFees(e.target.value);
  };

  const handleRoundDurationChange = (e) => {
    setRoundDuration(e.target.value);
  };

  const handleProceedClick = () => {
    socket.emit("createRoom", { entryFees, roundDuration, user });
    navigate(GAME_LOBBY_ROUTE);
  };

  const renderBackButton = () => {
    return (
      <div className={backButtonClassName}>
        <BackButton target={JOIN_GAME_ROUTE} color="black" />
      </div>
    );
  };

  const renderHeading = () => {
    return <div className={headingClassName}>Enter Game Details</div>;
  };

  const renderForm = () => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="entryFees" value="Entry Fees" />
          </div>
          <TextInput
            id="entryFees"
            type="text"
            sizing="sm"
            value={entryFees}
            onChange={handleEntryFeesChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="roundDuration"
              value="Round duration (in seconds)"
            />
          </div>
          <TextInput
            id="roundDuration"
            type="text"
            sizing="sm"
            value={roundDuration}
            onChange={handleRoundDurationChange}
          />
        </div>
      </div>
    );
  };

  const renderProceedButton = () => {
    return (
      <Button
        paddingX="4"
        paddingY="1"
        textSize="lg"
        onClick={handleProceedClick}
      >
        Proceed
      </Button>
    );
  };

  return (
    <>
      {renderBackButton()}
      <div className="flex flex-col justify-between h-[85vh] m-6">
        <div className="flex flex-col justify-center space-y-4">
          {renderHeading()}
          {renderForm()}
        </div>
        {renderProceedButton()}
      </div>
    </>
  );
}

export default GameDetails;
