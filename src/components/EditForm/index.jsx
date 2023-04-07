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
import { API, VAILTIOND_FORM } from "../../util";

export function EditForm({ post, close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      text: post.text,
      image: post.image || null,
    },
  });

  watch("image");
  const modalOptions = useToggle();
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
    console.log("getValues", getValues());
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
      setContent(
        <Success title="Edit Post" message={result.response.message} />
      );
    }
    modalOptions.open();
  }

  function handleCloseAfterSubmit() {
    close();
    modalOptions.close();
  }

  function handleGetSrcImage() {
    const path = getValues()?.image;
    if (typeof path == "string") return path;
    else if (typeof path == "object") {
      return URL.createObjectURL(path?.[0] || null);
    } else {
      return "";
    }
  }

  return (
    <>
      <h3 className="text-xl font-semibold">Edit Post</h3>
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
          <Button theme="second" className=" group ">
            {isLoading ? (
              <Loading className=" stroke-blue-500 group-hover:stroke-white" />
            ) : (
              "Edit Post"
            )}
          </Button>
        </div>
      </form>
      <Modal {...modalOptions} close={handleCloseAfterSubmit}>
        {content}
      </Modal>
    </>
  );
}

export default EditForm;
