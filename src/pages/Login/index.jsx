import React, { useEffect, useState } from "react";
import { Logo } from "../../images";
import {
  Page,
  Button,
  Input,
  Success,
  Error,
  Modal,
  Loading,
} from "./../../components";
import { useForm } from "react-hook-form";
import { API, Auth, VAILTIOND_FORM } from "../../util";
import { useFetch, useToggle } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.isLogin()) {
      navigate("/home");
    }
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { isLoading, usefetch } = useFetch();

  const modalOptions = useToggle();
  const [content, setContent] = useState(null);

  async function onSubmit() {
    const result = await usefetch(
      API.login,
      "POST",
      JSON.stringify(getValues())
    );
    if (result.response.status == "failed") {
      setContent(<Error message={result.response.message} />);
    } else {
      Auth.setUser(result.response.data);
      setContent(
        <>
          <Success
            title="Welcome To Our WebSite"
            message={result.response.message}
          />
          <div className="my-2">
            <Button theme="second" onClick={() => navigate("/home")}>
              Move To Home
            </Button>
          </div>
        </>
      );
    }
    modalOptions.open();
  }
  return (
    <Page className="flex flex-col gap-5  !max-w-[400px] m-auto">
      <div className="header ">
        <Logo className="w-[80px] h-[80px] m-auto" />
        <h1 className="my-[10px] font-semibold text-2xl">Login </h1>
        <p className="text-xl text-center">
          Fill the following information to create an account
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col my-4 gap-4 "
      >
        <Input
          id={"email"}
          label="Email"
          {...register("email", VAILTIOND_FORM.EMAIL)}
          error={errors?.email}
          helperText={errors?.email?.message}
        />
        <div className="mt-2 flex flex-col gap-5 items-center">
          <Button className="flex justify-center items-center">
            {isLoading ? <Loading className="stroke-white" /> : "Login"}
          </Button>
          <p>
            Don't have an account?
            <Link
              to={"/signup"}
              className="ml-1 text-blue-500 hover:cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      <Modal {...modalOptions}>{content}</Modal>
    </Page>
  );
}

export default Login;
