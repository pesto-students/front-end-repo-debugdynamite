import React from "react";

function Button({
  children,
  onClick,
  isRounded,
  isOutlined,
  textSize,
  paddingX,
  paddingY,
  isDisabled = false,
}) {
  // Define dynamic classes based on the props
  const buttonType = `
    ${isRounded ? "rounded-full" : "rounded-md"}
    ${
      isOutlined
        ? "border border-black border-2 text-black"
        : "bg-gray-900 hover:bg-gray-700 text-white"
    }
  `;

  const buttonClass = `py-${paddingY} px-8 font-bold text-${textSize} ${buttonType} `;

  return (
    <button className={buttonClass} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
}

export default Button;
