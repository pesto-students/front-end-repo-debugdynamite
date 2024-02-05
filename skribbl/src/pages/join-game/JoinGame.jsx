import React from "react";
import OTPInput from "../../composite-components/otp-input/OTPInput";
import BackButton from "../../components/back-button/BackButton";
import Button from "../../components/button";
import { DASHBOARD_ROUTE, GAME_DETAILS_ROUTE } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const backButtonClassName = "m-4";
const headingClassName = "font-bold text-xl";
const subHeadingClassName = "font-bold text-sm";

function JoinGame() {
  const navigate = useNavigate();

  const handleOTPComplete = (otp) => {
    console.log("OTP entered:", otp);
    // You can perform further actions with the completed OTP here
  };

  const renderBackButton = () => {
    return (
      <div className={backButtonClassName}>
        <BackButton target={DASHBOARD_ROUTE} color="black" />
      </div>
    );
  };

  const renderOTPInput = () => {
    return <OTPInput length={6} onComplete={handleOTPComplete} />;
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

  const renderVerifyButton = () => {
    return (
      <Button isOutlined paddingX="3" textSize="lg">
        Verify
      </Button>
    );
  };

  const renderHeading = () => {
    return <div className={headingClassName}>Enter Game Code</div>;
  };

  const renderSubHeading = () => {
    return <div className={subHeadingClassName}>Entry Fees: Rs. 10</div>;
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
            {renderSubHeading()}
          </div>
          {renderOTPInput()}
          {renderVerifiedTag()}
          {renderVerifyButton()}
        </div>
        {renderNewGameButton()}
      </div>
    </>
  );
}

export default JoinGame;
