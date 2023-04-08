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
    case "ADD": {
      return { ...state, posts: [action.payLoad, ...state.posts] };
    }
    case "SET_LIST": {
      return { ...state, posts: action.payLoad };
    }
  }
};

export function Home() {
  const [state, dispacth] = useReducer(reducerPost, {
    posts: [],
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
    // ADD_POST: handleAddPost,
    ADD_POST: (id, text, image) => {
      dispacth({
        type: "ADD",
        payLoad: {
          _id: id,
          user: Auth.getUser().data,
          text,
          image,
        },
      });
    },
  };

  const [search, setSearch] = useState("");
  const searchPosts = state.posts.filter((post) =>
    (post.text || "").toUpperCase().includes(search?.toUpperCase())
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
          onChange={(e) => setSearch(e.target.value)}
          endIcon={<SearchIcon className="w-4 h-4 fill-slate-400" />}
        />
      </header>

      <main className="my-auto ">
        <List
          user={user}
          onAddPost={optionsModal.open}
          list={searchPosts || []}
          isLoading={isLoading}
          hasPosts={state.posts.length}
          search={search}
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
          <AddForm close={optionsModal.close} controls={CONTROLS} />
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
    </Page>
  );
}

export default Home;
