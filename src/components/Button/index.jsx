import React from "react";

function getStyle(theme) {
  switch (theme.toLowerCase()) {
    case "second":
      return "bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white  ";

    case "delete":
      return "bg-[#D84242] text-white  hover:bg-red-700  ";
    case "check":
      return " text-[#28a745] border-2 border-[#28a745] hover:bg-[#28a745] hover:text-white ";
    case "close":
      return " text-black border border-gray-400 hover:bg-gray-400 hover:text-white ";
    case "main":
    default:
      return "bg-blue-500 text-white hover:bg-blue-600";
  }
}

export function Button({ theme = "main", className = "", children, ...rest }) {
  const buttonClass = getStyle(theme);
  return (
    <button
      className={`
      p-2 w-full 
      text-base font-semibold
      transition-all
      rounded-sm 
      
    ${buttonClass} 
    ${className}`}
      {...rest}>
      {children}
    </button>
  );
}

export default Button;
