import React from "react";

function Button({
  children,
  onClick,
  isRounded,
  isOutlined,
  textSize,
  paddingX,
  paddingY,
}) {
  // Define dynamic classes based on the props
  const buttonClasses = `
    ${isRounded ? "rounded-full" : "rounded-md"}
    ${
      isOutlined
        ? "border border-black border-2 text-black"
        : "bg-gray-900 hover:bg-gray-700 text-white"
    }
  `;

  return (
    <button
      className={`font-bold text-${textSize} ${buttonClasses} py-${paddingY} px-${paddingX}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
