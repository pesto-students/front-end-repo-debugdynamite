import React from "react";

function Button({ children, onClick }) {
  return (
    <button
      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-full text-2xl "
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
