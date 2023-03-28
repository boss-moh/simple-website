import { useState } from "react";

export const useToggle = (intiailValue = false) => {
  const [isOpen, setIsOpen] = useState(intiailValue);
  function close() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }
  function toggle() {
    setIsOpen((prev) => !prev);
  }
  return {
    close,
    open,
    isOpen,
    toggle,
  };
};

export default useToggle;
