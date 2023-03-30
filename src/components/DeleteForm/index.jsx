import React, { useState } from "react";

import { Button, Error, Modal, Success } from "../../components";
import { useFetch, useToggle } from "../../hooks";
import { LoadingIcon } from "../../images";
import { API } from "../../util";

export function DeleteForm({ close, post }) {
  const { isLoading, usefetch } = useFetch();

  const modalOptions = useToggle();
  const [content, setContent] = useState(null);

  async function deleteRequest() {
    const result = await usefetch(API.deletePost(post._id), "DELETE");

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
    <div className="flex flex-col gap-6  px-2 py-3">
      <p className="capitalize  text-lg font-medium text-center">
        Are you sure you want to delete this post
      </p>
      <div className="flex flex-row gap-2">
        <Button
          theme="second"
          onClick={close}>
          No
        </Button>
        <Button
          className="flex justify-center items-center"
          theme="delete"
          onClick={deleteRequest}>
          {isLoading ? (
            <>
              <LoadingIcon className=" text-transparent animate-spin w-8 h-8  stroke-white " />
              <span className="ml-[10px]">Deleting . . .</span>
            </>
          ) : (
            "Yes"
          )}
        </Button>
      </div>
      <Modal
        {...modalOptions}
        close={handleCloseAfterSubmit}>
        {content}
      </Modal>
    </div>
  );
}

export default DeleteForm;
