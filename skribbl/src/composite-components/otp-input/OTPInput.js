import React, { useState, useRef, useEffect } from "react";

const OTPInput = ({ length, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (!/^[0-9a-zA-Z]*$/.test(value)) return;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;

      // Auto move to the next input field if there is a value
      if (value !== "" && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }

      return newOtp;
    });

    const fullOtp = otp.join("");
    if (fullOtp.length === length) {
      onComplete(fullOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // Move to the previous input field on Backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          className="w-10 h-10 border border-gray-300 rounded-md text-center mx-1 focus:outline-none"
          value={otp[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
