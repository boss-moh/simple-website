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
      <div
        className={`border flex items-center gap-2 p-2 text-lg capitalize ${className}`}>
        <input
          type={type}
          id={id}
          {...rest}
          ref={ref}
          className="peer hidden"
        />
        <span className="border w-5 h-5 rounded-full peer-checked:bg-blue-400 peer-checked:border-blue-400 transition-all"></span>
        <label
          htmlFor={id}
          className={`peer-checked:text-blue-500 transition-all ${labelClass}`}>
          {label}
        </label>
      </div>
    );
  }
);
Radio.displayName = "Radio";

export default Radio;
