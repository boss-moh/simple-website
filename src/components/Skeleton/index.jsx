import React from "react";

export function Skeleton({ className = "" }) {
  return (
    <span
      className={`border  shadow rounded-md bg-slate-200  w-full animate-pulse ${className}`}
    ></span>
  );
}

export default Skeleton;
