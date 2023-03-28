import React, { useState } from "react";
import { Error, Success } from "../../components";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useToggle from "../../hooks/useToggle";

export default function Test() {
  const object = useToggle();
  const [content, setContent] = useState();
  function handleOpenWithTure() {
    setContent(
      <Error
        title="Error message"
        message="test my Componet"
      />
    );
    object.open();
  }
  function handleOpenWithFalse() {
    setContent(
      <Success
        title="Error message"
        message="test my Componet"
      />
    );
    object.open();
  }
  return (
    <div>
      Test
      <Button onClick={handleOpenWithFalse}>false</Button>
      <Button onClick={handleOpenWithTure}>True</Button>
      <Modal {...object}>{content}</Modal>
    </div>
  );
}
