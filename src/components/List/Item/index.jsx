import React from "react";
import { useState } from "react";
import {
  ButtonIcon,
  Image,
  CustemMenu,
  Button,
  Modal,
  EditForm,
  DeleteForm,
} from "../../../components";
import { useFetch, useToggle } from "../../../hooks";
import {
  OptionsIcon,
  ShareIcon,
  ImageNotFoundIcon,
  EditIcon,
  DeleteIcon,
} from "../../../images";
import ShareForm from "../../ShareForm";

export function Item({ user, post }) {
  const hasPermsion = post.user._id == user.data._id;

  const modalOptions = useToggle();
  const sharemodalOptions = useToggle();
  const [content, setContent] = useState();

  function onShareClick() {
    sharemodalOptions.open();
  }

  function handleEdit() {
    setContent(
      <EditForm
        close={modalOptions.close}
        post={post}
      />
    );
    modalOptions.open();
  }

  function handleDelete() {
    setContent(
      <DeleteForm
        post={post}
        close={modalOptions.close}
      />
    );
    modalOptions.open();
  }

  return (
    <div className="flex flex-col border sm:flex-row sm:gap-4    ">
      <div>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.text}
            className="w-full h-[250px]  object-cover  transition-all duration-1000  sm:w-[200px] sm:h-[200px]  "
          />
        ) : (
          <ImageNotFoundIcon className="w-full h-[250px]    sm:w-[200px] sm:h-[200px]" />
        )}
      </div>

      <div className="flex flex-col  items-center sm:items-start text-justify flex-grow  pt-3 ">
        <h3 className="text-lg font-semibold">{post.user.name}</h3>
        <p className="text-gray-400 text-sm ">{post.text}</p>
      </div>

      <div
        className="flex justify-between w-full
      p-2 self-stretch flex-row-reverse  sm:w-fit sm:flex-col  ">
        {hasPermsion && (
          <>
            <ButtonIcon onClick={onShareClick}>
              <ShareIcon className="w-6 h-6" />
            </ButtonIcon>
            <CustemMenu
              className=" translate-x-[85%] sm:translate-x-0 "
              button={<OptionsIcon className="w-6 h-6 text-blue-400 " />}
              buttonClassName="!rounded-full !px-2 !py-2 hover:bg-gray-400 bg-transparent">
              <Button
                onClick={handleEdit}
                theme="second"
                className="flex items- border-none group">
                <EditIcon className="mr-2 h-5 w-5 text-white stroke-blue-400 group-hover:stroke-white " />
                <span>Edit</span>
              </Button>
              <Button
                onClick={handleDelete}
                theme="second"
                className="flex items-center border-none group">
                <DeleteIcon
                  className="mr-2 h-5 w-5 text-white  stroke-blue-400 group-hover:stroke-white
 "
                />
                <span>Delete</span>
              </Button>
            </CustemMenu>
            <Modal {...modalOptions}>{content}</Modal>
            <Modal {...sharemodalOptions}>
              <ShareForm
                close={sharemodalOptions.close}
                post={post}
              />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default Item;
