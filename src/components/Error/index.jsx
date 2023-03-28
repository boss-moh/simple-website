import React from "react";
import { ErrorIcon } from "../../images";

export function Error({ title = "", message = "dsadsa" }) {
  return (
    <div>
      <h3 className="text-xl">Error {title}</h3>
      <div className="flex flex-col  gap-2 mt-4 text-center">
        <ErrorIcon className="w-36 h-36 m-auto" />
        <p>Oops Some Error Happen</p>
        <p className="text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
}

export default Error;
