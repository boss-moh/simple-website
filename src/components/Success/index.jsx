import React from "react";
import { SuccessIcon } from "../../images";

export function Success({ title = "", message = "dsadsa" }) {
  return (
    <div>
      <h3 className="text-xl">Successfull </h3>
      <div className="flex flex-col  gap-2 mt-4 text-center">
        <SuccessIcon className="w-36 h-36 m-auto" />
        <p>{title}</p>
        <p className="text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
}

export default Success;
