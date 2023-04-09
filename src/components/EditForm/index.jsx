import React, { useEffect, useState } from "react";
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
import { API } from "../../util";

export function EditForm({ post, close, CONTROLS }) {
  const { register, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      text: post?.text,
      image: post?.image || null,
    },
  });

  watch("image");
  const modalSettnigs = useToggle();
  const [content, setContent] = useState(null);
  const { isLoading, usefetch } = useFetch();

  function prepareData(data) {
    const formData = new FormData();
    formData.append("text", data.text);

    const image = data?.image?.[0];
    if (typeof image == "object") {
      formData.append("image", image);
    }

    return formData;
  }
  async function onSubmit() {
    const dataRequest = prepareData(getValues());
    const result = await usefetch(
      API.updataPost(post._id),
      "PUT",
      dataRequest,
      "multipart/form-data;"
    );
    if (result.response.status == "failed") {
      setContent(<Error message={result.response.message} />);
    } else {
      CONTROLS.EDIT_POST(post._id, getValues().text, handleGetSrcImage());
      setContent(
        <Success title="Edit Post" message={result.response.message} />
      );
    }
    modalSettnigs.open();
  }

  function handleCloseAfterSubmit() {
    close();
    modalSettnigs.close();
  }

  function handleGetSrcImage() {
    const path = getValues()?.image;
    if (typeof path == "string") return path;
    else if (typeof path == "object" && path) {
      return URL.createObjectURL(path?.[0] || null);
    } else {
      return "";
    }
  }

  return (
    <>
      <h3 className="text-xl font-semibold">Edit Post</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextArea {...register("text")} />
        <InputFile {...register("image")} getSrcImage={handleGetSrcImage} />
        <div className="flex gap-2 flex-col-reverse sm:flex-row">
          <Button onClick={close} type="button">
            Cancel
          </Button>
          <Button
            theme="second"
            className="flex justify-center items-center group "
          >
            {isLoading ? (
              <Loading className=" stroke-blue-500 group-hover:stroke-white" />
            ) : (
              "Edit Post"
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

export default EditForm;
