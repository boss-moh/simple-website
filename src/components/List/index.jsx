import React from "react";
import { PlusIcon } from "../../images";
import { Loading, ButtonIcon, Button, Skeleton } from "../../components";
import { Item } from "./Item";

export function List({
  user,
  className = "",
  onAddPost,
  list,
  isLoading,
  hasPosts = false,
  search,
  CONTROLS,
}) {
  return (
    <div className={` border  p-2 ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="capitalize  font-semibold">List of post</h2>
        <ButtonIcon className="p-0" onClick={onAddPost}>
          <PlusIcon className="w-8 h-8" />
        </ButtonIcon>
      </div>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-[100px] mb-2 rounded-sm" />
          ))
        ) : !list.length ? (
          <div className=" flex flex-col  gap-2 items-center">
            {hasPosts ? (
              <>
                <span className="capitalize">
                  you don't have any post start with
                </span>
                <span>({search})</span>
              </>
            ) : (
              <>
                <p>you don't have any post</p>
                <Button onClick={onAddPost}>Make frist your Post</Button>
              </>
            )}
          </div>
        ) : (
          <div className="list flex flex-col  gap-4">
            {list.map((post) => (
              <Item
                user={user}
                post={post}
                key={post._id}
                CONTROLS={CONTROLS}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
