import React from "react";

export const Radio = React.forwardRef(
  (
    {
      id,
      type = "Radio",
      label = "",
      labelClass = "",
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`border flex gap-2 p-2 text-lg capitalize ${className}`}>
        <input
          type={type}
          id={id}
          {...rest}
          ref={ref}
          className="peer"
        />
        <label
          htmlFor={id}
          className={`peer-checked:text-blue-500 ${labelClass}`}>
          {label}
        </label>
      </div>
    );
  }
);
Radio.displayName = "Radio";

export default Radio;
