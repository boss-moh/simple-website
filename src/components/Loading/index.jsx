import React from "react";
import { LoadingIcon } from "../../images";

export function Loading({ className = "", children }) {
  return (
    <span className={`flex gap-2 items-center  ${className}`}>
      <LoadingIcon className=" text-transparent animate-spin w-8 h-8" />
      {children || "Loading . . ."}
    </span>
  );
}

export default Loading;
