import React from "react";
import { CloudIcon } from "../../images";
import Image from "../Image";

export const InputFile = React.forwardRef(
  ({ className = "", path = "", ...rest }, ref) => {
    function getImage(path) {
      return URL.createObjectURL(path);
    }
    const activeClass = !path
      ? " border border-gray-400 border-dashed "
      : " border-2  bg-green-100 border-green-600  ";
    return (
      <label>
        <input
          type="file"
          className="hidden "
          ref={ref}
          {...rest}
        />
        <div className={`  px-2 py-4 gap-5${className} ${activeClass}`}>
          {!path ? (
            <div className="flex flex-col justify-center items-center text-center">
              <p className="font-semibold"> Upload your image</p>
              <CloudIcon className="w-20 h-20 " />
              <p className="font-semibold">
                Drage and drop or browse to choose a file
              </p>
            </div>
          ) : (
            <Image src={getImage(path)} />
          )}
        </div>
      </label>
    );
  }
);
InputFile.displayName = "InputFile";

export default InputFile;
