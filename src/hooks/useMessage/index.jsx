import React, { useState } from "react";
import { Message } from "../../components";

export function useMessage({
  title = "",
  children,
  defaultButtton,
  actionButton,
  classButtons,
  defaultButttonClass,
  defaultActionClass,
  actionFun = console.log,
}) {
  const [isShow, setIsShow] = useState(false);
  const [parameter, setParameter] = useState({
    title,
    children,
    defaultButtton,
    actionButton,
    classButtons,
    defaultButttonClass,
    defaultActionClass,
    actionFun,
  });

  function changeMessage({
    title,
    children,
    defaultButtton,
    actionButton,
    classButtons,
    defaultButttonClass,
    defaultActionClass,
    actionFun,
  }) {
    setParameter({
      title,
      children,
      defaultButtton,
      actionButton,
      classButtons,
      defaultButttonClass,
      defaultActionClass,
      actionFun,
    });
  }

  const element = (
    <Message
      title={parameter.title}
      isShow={isShow}
      setIsShow={setIsShow}
      defaultButtton={parameter.defaultButtton}
      actionButton={parameter.actionButton}
      classButtons={parameter.classButtons}
      defaultButttonClass={parameter.defaultButttonClass}
      defaultActionClass={parameter.defaultActionClass}
      action={parameter.actionFun}>
      {parameter.children}
    </Message>
  );

  return {
    message: element,
    isShow,
    setIsShow,
    changeMessage,
  };
}

export default useMessage;
