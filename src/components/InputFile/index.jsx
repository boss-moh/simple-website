import React from "react";
import { CloudIcon } from "../../images";
import Image from "../Image";

export const InputFile = React.forwardRef(
  ({ className = "", getSrcImage, ...rest }, ref) => {
    const hasImage = !!getSrcImage();
    const activeClass = hasImage
      ? " border-2  bg-green-100 border-green-600  "
      : " border border-gray-400 border-dashed ";
    return (
      <label>
        <input
          type="file"
          className="hidden "
          ref={ref}
          {...rest}
        />
        <div className={`  px-2 py-4 gap-5${className} ${activeClass}`}>
          {!hasImage ? (
            <div className="flex flex-col justify-center items-center text-center">
              <p className="font-semibold"> Upload your image</p>
              <CloudIcon className="w-20 h-20 " />
              <p className="font-semibold">
                Drage and drop or browse to choose a file
              </p>
            </div>
          ) : (
            <Image
              src={getSrcImage()}
              className="m-auto"
            />
          )}
        </div>
      </label>
    );
  }
);
InputFile.displayName = "InputFile";

export default InputFile;
