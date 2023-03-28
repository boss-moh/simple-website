import React from "react";
import { ButtonIcon, Image } from "../../../components";
import { OptionsIcon, ShareIcon, ImageNotFoundIcon } from "../../../images";

export function Item({ post }) {
  const havePermsion = true;

  function onShareClick() {
    console.log("onShareClick");
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
        <ButtonIcon onClick={onShareClick}>
          <ShareIcon className="w-6 h-6" />
        </ButtonIcon>

        {havePermsion && (
          <ButtonIcon onClick={onShareClick}>
            <OptionsIcon className="w-6 h-6 text-blue-400" />
          </ButtonIcon>
        )}
      </div>
    </div>
  );
}

export default Item;
