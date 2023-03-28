import React from "react";

export const TextArea = React.forwardRef(
  (
    {
      id,
      label = "",
      labelClass = "",
      startIcon = "",
      endIcon = "",
      classStartIcon = "",
      classEndIcon = "",
      helperText = "",
      error = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const classes = {
      input: "border border-gray-400  ",

      inputError: " border border-red-500  ",
      helperText: "text-sm text-gray-500",
      helperTextError: "text-red-500",
    };

    const ActiveClasses = {
      input: error ? classes.inputError : classes.input,
      helperText: error ? classes.helperTextError : classes.helperText,
      startIcon: "block  absolute top-1/2 -translate-y-1/2 left-[10px]",
      endIcon: " block  absolute top-1/2 -translate-y-1/2 right-[10px] ",
    };

    return (
      <div className={className}>
        <label
          className={` capitalize text-base text-gray-700 ${labelClass}`}
          htmlFor={id}>
          {label}
        </label>
        <div className="relative ">
          <textarea
            className={` resize-none w-full min-h-[100px] outline-none pl-[10px] py-1 text-base  rounded-sm text-gray-700 ${
              ActiveClasses.input
            } ${startIcon ? "pl-[40px]" : ""}`}
            id={id}
            ref={ref}
            {...rest}></textarea>
          {startIcon && (
            <span className={`${ActiveClasses.startIcon} ${classStartIcon}`}>
              {startIcon}
            </span>
          )}
          {endIcon && (
            <span className={` ${ActiveClasses.endIcon}   ${classEndIcon}`}>
              {endIcon}
            </span>
          )}
        </div>
        {helperText && (
          <p className={`text-sm ${ActiveClasses.helperText}`}>{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
