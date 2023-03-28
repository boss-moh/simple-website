import React from "react";

export function ImageNotFoundIcon(props) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
      {...props}>
      <circle
        fill="#F5F5F5"
        cx="50%"
        cy="50%"
        r="200"></circle>
      <polygon
        points="22 15.5 17 10 10.59 16.99 6.5 13 2 17.5 2 22 22 22 22 15.5"
        strokeWidth="0"
        fill="#059cf7"
        opacity="0.1"></polygon>
      <polygon points="22 15.5 17 10 10.59 16.99 6.5 13 2 17.5 2 22 22 22 22 15.5"></polygon>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="0"></rect>
      <line
        x1="6.99"
        y1="7"
        x2="7"
        y2="7"
        strokeLinecap="round"
        strokeWidth="2"></line>
    </svg>
  );
}

export default ImageNotFoundIcon;
