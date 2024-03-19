import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import Button from "../Component/Button";
import { NavLink } from "react-router-dom";
import { useSignUp } from "../Hooks/authHooks/useSignUp";
import { useState } from "react";
import Loader from "../Component/loader";
import FormInput from "../Component/FormInput";
import Header from "../Component/Header";

function SignUp() {
   const { handleSubmit, register, getValues } = useForm();
   const { userSignUp, loadingSignUp } = useSignUp();
   const [avatar, setAvatar] = useState(null);
   const [coverImage, setCoverImage] = useState(null);

   function onSubmit(data) {
      const formData = new FormData();
      for (const item in data) {
         formData.append(item, data[item]);
      }
      formData.append("avatar", avatar);
      formData.append("coverImage", coverImage || "");

      userSignUp(formData);
   }
   return (
      <div className="h-[100%] px-3 py-1 flex flex-col justify-center items-center animate-slow">
         {loadingSignUp && <Loader />}

         <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-fit w-[300px] flex flex-col gap-4 rounded-md shadow-lg bg-zinc-800/50 py-2 px-5 items-center shadow-zinc-700/20"
         >
            <Header>Sign Up</Header>
            <FormInput
               type="text"
               id="username"
               placeholder="Username"
               register={register}
               required={true}
            />
            <FormInput
               type="text"
               id="fullName"
               placeholder="FullName"
               register={register}
               required={register}
            />
            <FormInput
               type="email"
               id="email"
               placeholder="email..."
               register={register}
               required={true}
            />
            <FormInput
               type="password"
               id="password"
               placeholder="password..."
               register={register}
               required={true}
            />
            <input
               className="min-w-[200px] bg-transparent w-full text-zinc-100 text-md p-1 outline-none border-[1px] border-zinc-400/50 text-wrap text-sm md:text-md rounded-md "
               type="password"
               id="confirm"
               placeholder="confirm password..."
               {...register("confirm", {
                  required: "confirm is required",
                  validate: (value) => {
                     value === getValues().password || "";
                  },
               })}
            />
            {/* {avatar} */}
            <label htmlFor="avatar" className="flex flex-col cursor-pointer">
               <div className="flex gap-4 items-center">
                  <FaRegUser />
                  Choose an avatar
               </div>
               <span className="text-sm border-b-[0.5px] border-zinc-600">
                  {avatar && avatar?.name}
               </span>
               <input
                  className="hidden"
                  type="file"
                  id="avatar"
                  onChange={(e) => {
                     setAvatar(e.target.files[0]);
                  }}
               />
            </label>
            {/* {coverImage} */}
            <label
               htmlFor="coverImage"
               className="flex flex-col cursor-pointer"
            >
               <div className="flex gap-4 items-center">
                  <FaImage />
                  Cover image
               </div>
               <span className="text-sm border-b-[0.5px] border-zinc-600">
                  {coverImage && coverImage?.name}
               </span>
               <input
                  className="hidden"
                  id="coverImage"
                  type="file"
                  onChange={(e) => {
                     setCoverImage(e.target.files[0]);
                  }}
               />
            </label>
            <Button extrastyles="rounded-sm text-xs h-[25px]" type="primary">
               Sign Up
            </Button>
            <NavLink to="/login">
               <span className="text-zinc-400 text-sm">
                  Already have an account ?
               </span>
               login
            </NavLink>
         </form>
      </div>
   );
}

export default SignUp;
