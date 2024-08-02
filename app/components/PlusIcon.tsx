import React, { useState } from "react";
import CheckIcon from "./CheckIcon";

interface PlusIconProps {
  filled?: boolean;
}

const PlusIcon: React.FC<PlusIconProps> = () => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleFill = () => {
    setIsFilled(!isFilled);
  };

  return (
    <svg
      onClick={toggleFill}
      className={`w-6 h-6 cursor-pointer ${
        isFilled ? CheckIcon : "text-gray-800 dark:text-white"
      }`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={isFilled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h14m-7 7V5"
      />
    </svg>
  );
};

export default PlusIcon;
