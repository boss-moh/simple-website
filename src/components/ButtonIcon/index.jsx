import React from "react";

export function ButtonIcon({ className = "", children, ...rest }) {
  return (
    <button
      className={` transition-all hover:bg-gray-200 p-2 rounded-full ${className}`}
      {...rest}>
      <span>{children}</span>
    </button>
  );
}

export default ButtonIcon;
