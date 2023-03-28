import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API, Auth } from "../../util";
import { Input, List, Page, AddForm, Button, Modal } from "../../components";
import { Logo, PersonIcon, SearchIcon } from "../../images";
import { useFetch, useToggle } from "../../hooks";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.isLogin()) {
      navigate("/login");
    }
  }, []);

  const user = Auth.getUser();

  const { data: response, isError, isLoading, usefetch } = useFetch();
  useEffect(() => {
    async function run() {
      return usefetch(API.getPosts(), API.getOptionsWithTaken());
    }
    run();
  }, []);

  const optionsModal = useToggle();

  return (
    <Page className="sm:p-6">
      <header className="flex flex-wrap items-center justify-between  gap-4 sm:flex-row  ">
        <Logo className="w-16 h-16  sm:w-10 sm:h-10 " />
        <div className=" flex flex-col items-center sm:order-10">
          <PersonIcon className="w-8 h-8 " />
          <p>{user?.data?.name || "noKwon"}</p>
        </div>
        <Input
          className="w-full sm:w-fit sm:flex-grow"
          onBlur={() => console.log("onBlur")}
          endIcon={<SearchIcon className="w-4 h-4 fill-slate-400" />}
        />
      </header>

      <main className="my-auto mt-10">
        <List
          onAddPost={optionsModal.open}
          list={response.data?.posts || []}
          isLoading={isLoading}
        />
        <Modal {...optionsModal}>
          <AddForm>
            <div className="flex gap-2">
              <Button
                onClick={optionsModal.close}
                type="button">
                Cancel
              </Button>
              <Button theme="second">Add Post</Button>
            </div>
          </AddForm>
        </Modal>
      </main>
    </Page>
  );
}

export default Home;
