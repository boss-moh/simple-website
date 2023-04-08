import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, Auth } from "../../util";
import {
  Input,
  List,
  Page,
  AddForm,
  Button,
  Modal,
  ButtonIcon,
} from "../../components";
import {
  ArrowIcon,
  DoorIcon,
  Logo,
  OpenDoorIcon,
  PersonIcon,
  SearchIcon,
} from "../../images";
import { useFetch, useToggle } from "../../hooks";

const reducerPost = function (state, action) {
  switch (action.type) {
    case "ADD_POST": {
      return { ...state, posts: [action.payLoad, ...state.posts] };
    }
    case "SET_LIST": {
      return { ...state, posts: action.payLoad };
    }
    case "REMOVE_POST": {
      const newPosts = state.posts.filter(
        (post) => post._id !== action.payLoad
      );
      return { ...state, posts: newPosts };
    }
    case "EDIT_POST": {
      const { id, text, image } = action.payLoad;
      const postIndex = state.posts.findIndex((post) => post._id == id);
      text && (state.posts[postIndex].text = text);
      image && (state.posts[postIndex].image = image);
      console.log("text", text, "image", image);
      return { ...state };
    }
    case "SEARCH": {
      return { ...state, searchTerm: action.payLoad };
    }
    default: {
      return state;
    }
  }
};

export function Home() {
  const [state, dispacth] = useReducer(reducerPost, {
    posts: [],
    searchTerm: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.isLogin()) {
      navigate("/login");
    }
  }, []);

  const optionsModal = useToggle();

  const user = Auth.getUser();

  const { isError, isLoading, usefetch } = useFetch();
  useEffect(() => {
    usefetch(API.getPosts("0")).then((data) => {
      console.log("data.response", data.response);
      dispacth({ type: "SET_LIST", payLoad: data.response.data?.posts || [] });
    });
  }, []);

  console.log(state);

  const CONTROLS = {
    ADD_POST: (id, text, image) => {
      dispacth({
        type: "ADD_POST",
        payLoad: {
          _id: id,
          user: Auth.getUser().data,
          text,
          image,
        },
      });
    },
    REMOVE_POST: (id) => dispacth({ type: "REMOVE_POST", payLoad: id }),
    EDIT_POST: (id, text, image) => {
      dispacth({
        type: "EDIT_POST",
        payLoad: {
          id,
          text,
          image,
        },
      });
    },
    SEARCH: (searchTerm) => dispacth({ type: "SEARCH", payLoad: searchTerm }),
  };

  const searchPosts = state.posts.filter((post) =>
    (post.text || "").toUpperCase().includes(state.searchTerm?.toUpperCase())
  );

  function handleLogout() {
    Auth.logOut();
    navigate("/login");
  }

  const start = 4;
  const total = 4;

  return (
    <Page className="sm:p-6">
      <header className=" mb-10 flex flex-wrap  justify-between  gap-4  items-center  sm:flex-row   ">
        <Logo className="w-16 h-16  sm:w-10 sm:h-10 " />

        <div className=" flex flex-col items-center w-fit sm:order-10 ">
          <PersonIcon className="w-10 h-10 " />
          <p>{user?.data?.name || "noKwon"}</p>
        </div>

        <Input
          className="w-full sm:w-fit sm:flex-grow"
          onChange={(e) => CONTROLS.SEARCH(e.target.value)}
          endIcon={<SearchIcon className="w-4 h-4 fill-slate-400" />}
        />
      </header>

      {isError ? (
        <div>Some Error happer</div>
      ) : (
        <>
          <main className="my-auto ">
            <List
              user={user}
              onAddPost={optionsModal.open}
              list={searchPosts || []}
              isLoading={isLoading}
              hasPosts={state.posts.length}
              search={state.searchTerm}
              CONTROLS={CONTROLS}
            />
            <div className="flex justify-center items-center">
              <ButtonIcon>
                <ArrowIcon className="w-4 h-4 stroke-blue-500" />
              </ButtonIcon>
              <span>
                {start} / {total}
              </span>
              <ButtonIcon>
                <ArrowIcon className="w-4 h-4 rotate-180  stroke-blue-500" />
              </ButtonIcon>
            </div>
            <Modal {...optionsModal}>
              <AddForm close={optionsModal.close} CONTROLS={CONTROLS} />
            </Modal>
          </main>
          <div className="fixed bottom-10 right-0   ">
            <Button
              onClick={handleLogout}
              className="bg-gray-300 hover:bg-gray-300 transition-all w-fit h-fit   rounded-l-full group !pl-4 "
            >
              <DoorIcon className="text-white fill-white w-16 group-hover:hidden" />
              <OpenDoorIcon className="text-white fill-white  w-16 hidden group-hover:block" />
            </Button>
          </div>
        </>
      )}
    </Page>
  );
}

export default Home;
