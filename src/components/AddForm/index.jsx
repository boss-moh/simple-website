import React from "react";
import { useForm } from "react-hook-form";
import { TextArea, InputFile, Button } from "../../components";

export function AddForm({ children }) {
  const { register, handleSubmit, getValues, watch } = useForm();
  watch("image");

  async function onSubmit() {
    console.log(getValues());
  }
  return (
    <div>
      <h3 className="text-xl font-semibold">Add Post</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <TextArea {...register("text")} />
        <InputFile
          {...register("image")}
          path={getValues()?.image?.[0]}
        />
      </form>
    </div>
  );
}

export default AddForm;
