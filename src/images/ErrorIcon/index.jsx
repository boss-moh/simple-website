import React from "react";

export function ErrorIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
      {...props}>
      <path
        fill="#F44336"
        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
      />
      <path
        fill="#FFFFFF"
        d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
      />
      <path
        fill="#FFFFFF"
        d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
      />
    </svg>
  );
}
export default ErrorIcon;