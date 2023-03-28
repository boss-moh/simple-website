import React, { useEffect, useState } from "react";
import { Page, Input, Button, Error, Success, Modal } from "../../components";
import { LoadingIcon, Logo } from "../../images";
import { useForm } from "react-hook-form";
import { VAILTIOND_FORM, API, Auth } from "../../util";
import { useFetch, useToggle } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.isLogin()) {
      navigate("/home");
    }
  }, []);

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isLoading, usefetch } = useFetch();

  const modalOptions = useToggle();
  const [content, setContent] = useState(null);

  async function onSubmit() {
    const result = await usefetch(
      API.signUp(),
      API.signUpRequest(JSON.stringify(getValues()))
    );

    if (result.data.status == "failed") {
      setContent(<Error message={result.data.message} />);
    } else {
      Auth.setUser(result.data.data);
      setContent(
        <>
          <Success
            title="Welcome To Our WebSite"
            message={result.data.message}
          />
          <div className="my-2">
            <Button
              theme="second"
              onClick={() => navigate("/home")}>
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
        <h1 className="my-[10px] font-semibold text-2xl">Sign Up</h1>
        <p className="text-xl text-center">
          Fill the following information to create an account
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col my-4 gap-4 ">
        <Input
          label="Name"
          {...register("name", VAILTIOND_FORM.NAME)}
          error={errors?.name}
          helperText={errors?.name?.message}
        />
        <Input
          label="Email"
          {...register("email", VAILTIOND_FORM.EMAIL)}
          error={errors?.email}
          helperText={errors?.email?.message}
        />
        <div className="mt-2 flex flex-col gap-5 items-center">
          <Button className="flex justify-center items-center">
            {isLoading ? (
              <>
                <LoadingIcon className=" text-transparent animate-spin w-8 h-8  " />
                <p className="ml-[10px]">Loading . . .</p>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p>
            Already have an account?
            <Link
              to={"/login"}
              className="ml-1 text-blue-500 hover:cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </form>
      <Modal {...modalOptions}>{content}</Modal>
    </Page>
  );
}

export default SignUp;