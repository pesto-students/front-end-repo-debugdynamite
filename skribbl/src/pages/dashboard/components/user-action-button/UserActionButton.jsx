import React from "react";
// import PropTypes from "prop-types";

function UserActionButton({
  backgroundColor = "bg-blue-500",
  icon,
  label,
  onClick,
}) {
  const handleClick = () => {
    alert("Click");
  };

  let imgClassName =
    "w-16 h-16 rounded-full overflow-hidden flex justify-center items-center " +
    backgroundColor;

  const renderIcon = () => {
    return (
      <div className={imgClassName}>
        <img src={icon} alt="icon" className="h-10 w-10" />
      </div>
    );
  };

  const renderLabel = () => {
    return <div className="text-center mt-2">{label}</div>;
  };

  return (
    <button className="mx-4 flex flex-col items-center" onClick={handleClick}>
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
