import React from "react";

interface StaticInputProps {
  type?: string;
  additionalStyling?: string;
  value: string;
  placeholder?: string;
  stringChange: (value: string) => void;
}

export default function StaticInput({
    type,
    stringChange,
    value,
    placeholder,
    additionalStyling,
}: StaticInputProps) {
  return(
    <input
    type={type}
    className={`w-full border border-ocean-green p-2 rounded-xl shadow-md hover:shadow:lg focus:outline-none focus:ring focus:ring-british-racing-green ${additionalStyling}`}
    value={value}
    onChange={(e) => stringChange(e.target.value)}
    placeholder={placeholder}
  />
  );
}