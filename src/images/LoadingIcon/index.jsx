import React from "react";

export function LoadingIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}>
      <circle
        cx="50"
        cy="50"
        r="32"
        strokeWidth="8"
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="currentColor"
        strokeLinecap="round"></circle>
    </svg>
  );
}

export default LoadingIcon;
