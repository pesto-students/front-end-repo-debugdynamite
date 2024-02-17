import React from "react";
// import PropTypes from "prop-types";

function UserActionButton({
  backgroundColor = "bg-blue-500",
  icon,
  label,
  onClick,
}) {
  let imgClassName =
    "w-14 h-14 rounded-full overflow-hidden flex justify-center items-center " +
    backgroundColor;

  const renderIcon = () => {
    return (
      <div className={imgClassName}>
        <img src={icon} alt="icon" className="h-8 w-8" />
      </div>
    );
  };

  const renderLabel = () => {
    return <div className="text-center mt-2">{label}</div>;
  };

  return (
    <button className="mx-4 flex flex-col items-center" onClick={onClick}>
      {renderIcon()}
      {renderLabel()}
    </button>
  );
}

// UserActionButton.prototypes = {
//   backgroundColor: PropTypes.string,
//   icon: PropTypes.symbol,
//   label: PropTypes.string,
//   onClick: PropTypes.func,
// };

// UserActionButton.defaultProps = {
//   name: "",
// };

export default UserActionButton;
