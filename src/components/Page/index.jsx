import React from "react";

export function Page({ className = "", children = "" }) {
  return (
    <div
      className={`max-w-[900px] m-auto min-h-screen bg-white flex flex-col
    justify-center p-3 ${className}`}>
      {children}
    </div>
  );
}

export default Page;
