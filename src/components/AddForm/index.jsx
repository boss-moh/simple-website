import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextArea,
  InputFile,
  Button,
  Modal,
  Success,
  Error,
  Input,
} from "../../components";
import { useFetch, useToggle } from "../../hooks";
import { API, VAILTIOND_FORM } from "../../util";

export function AddForm({ children, close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();
  watch("image");

  const modalOptions = useToggle();
  const [content, setContent] = useState(null);
  const { usefetch } = useFetch();

  function prepareData(data) {
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("image", data.image[0]);
    return formData;
  }
  async function onSubmit() {
    const dataRequest = prepareData(getValues());
    const result = await usefetch(API.addPost, "POST", dataRequest);
    if (result.response.status == "failed") {
      setContent(<Error message={result.response.message} />);
    } else {
      setContent(
        <Success
          title="Added Post"
          message={result.response.message}
        />
      );
    }
    modalOptions.open();
  }

  function handleCloseAfterSubmit() {
    close();
    modalOptions.close();
  }

  return (
    <>
      <h3 className="text-xl font-semibold">Add Post</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <TextArea
          {...register("text", VAILTIOND_FORM.TEXT)}
          error={errors?.text}
          helperText={errors?.text?.message}
        />
        <InputFile
          {...register("image")}
          path={getValues()?.image?.[0]}
        />
        {children}
      </form>
      <Modal
        {...modalOptions}
        close={handleCloseAfterSubmit}>
        {content}
      </Modal>
    </>
  );
}

export default AddForm;
