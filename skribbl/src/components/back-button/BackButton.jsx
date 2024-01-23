import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ target, color = "white" }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(target);
  };
  return (
    <button data-testid="back-button">
      <FontAwesomeIcon
        icon={faAngleLeft}
        style={{ color }}
        onClick={handleClick}
      />
    </button>
  );
}

export default BackButton;
