import React from "react";
import { PlusIcon } from "../../images";
import { Loading, ButtonIcon } from "../../components";
import { Item } from "./Item";
import { getID } from "../../util";

export function List({ className = "", onAddPost, list, isLoading }) {
  console.log("list", list);
  return (
    <div className={` border  p-2 ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="capitalize  font-semibold">List of post</h2>
        <ButtonIcon
          className="p-0"
          onClick={onAddPost}>
          <PlusIcon className="w-8 h-8" />
        </ButtonIcon>
      </div>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          [1, 2, 3].map((item) => <Loading key={item} />)
        ) : !list.length ? (
          <div>you don't have any post</div>
        ) : (
          <div className="list flex flex-col  gap-4">
            {list.map((post) => (
              <Item
                post={post}
                key={post._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
