import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextArea,
  InputFile,
  Button,
  Modal,
  Success,
  Error,
  Loading,
} from "../../components";
import { useFetch, useToggle } from "../../hooks";
import { API, VAILTIOND_FORM, getID } from "../../util";

export function AddForm({ close, CONTROLS }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();
  watch("image");

  const modalSettnigs = useToggle();
  const [content, setContent] = useState(null);
  const { isLoading, usefetch } = useFetch();

  function prepareData(data) {
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("image", data.image[0]);
    return formData;
  }

  async function onSubmit() {
    const dataRequest = prepareData(getValues());
    const result = await usefetch(
      API.addPost,
      "POST",
      dataRequest,
      "multipart/form-data;"
    );
    if (result.response.status == "failed") {
      setContent(<Error message={result.response.message} />);
    } else {
      const ID = result.response?.data?.id || getID();
      CONTROLS.ADD_POST(ID, getValues().text, handleGetSrcImage());
      setContent(
        <Success title="Added Post" message={result.response.message} />
      );
    }
    modalSettnigs.open();
  }

  function handleCloseAfterSubmit() {
    close();
    modalSettnigs.close();
  }

  function handleGetSrcImage() {
    const path = getValues()?.image?.[0] || null;
    return path && URL.createObjectURL(path);
  }

  return (
    <>
      <h3 className="text-xl font-semibold">Add Post</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextArea
          {...register("text", VAILTIOND_FORM.TEXT)}
          error={errors?.text}
          helperText={errors?.text?.message}
        />
        <InputFile {...register("image")} getSrcImage={handleGetSrcImage} />
        <div className="flex gap-2 flex-col-reverse sm:flex-row">
          <Button onClick={close} type="button">
            Cancel
          </Button>

          <Button
            theme="second"
            className=" flex justify-center items-center group"
          >
            {isLoading ? (
              <Loading className=" stroke-blue-500 group-hover:stroke-white" />
            ) : (
              "Add Post"
            )}
          </Button>
        </div>
      </form>
      <Modal {...modalSettnigs} close={handleCloseAfterSubmit}>
        {content}
      </Modal>
    </>
  );
}

export default AddForm;
