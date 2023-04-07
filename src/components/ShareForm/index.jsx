import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  Success,
  Error,
  Input,
  Loading,
} from "../../components";
import { useFetch, useToggle } from "../../hooks";
import { API, VAILTIOND_FORM } from "../../util";
import { Radio } from "../Radio";

export function ShareForm({ post, close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const modalOptions = useToggle();
  const [content, setContent] = useState(null);
  const { isLoading, usefetch } = useFetch();

  async function onSubmit() {
    const dataRequest = JSON.stringify(getValues());
    const result = await usefetch(API.sharePost(post._id), "POST", dataRequest);
    if (result.response.status == "failed") {
      setContent(<Error message={result.response.message} />);
    } else {
      setContent(
        <Success title="Share Post" message={result.response.message} />
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
      <h3 className="text-xl font-semibold">Share Post</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="email"
          {...register("email", VAILTIOND_FORM.EMAIL)}
          error={errors?.text}
          helperText={errors?.text?.message}
        />
        <Radio
          {...register("view")}
          id="only View"
          label="only View"
          value="read"
        />
        <Radio
          {...register("view")}
          id="View and Edit"
          label="View and Edit"
          value="write"
        />

        <div className="flex gap-2 flex-col-reverse sm:flex-row">
          <Button onClick={close} type="button">
            {isLoading ? "Close" : "Cancel"}
          </Button>

          <Button theme="second" className=" group" type="submit">
            {isLoading ? (
              <>
                <Loading className=" stroke-blue-500 group-hover:stroke-white" />
              </>
            ) : (
              "Share Post"
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

export default ShareForm;
