import { useForm } from "react-hook-form";
import Button from "../Component/Button";
import { NavLink } from "react-router-dom";
import { useSignUp } from "../Hooks/authHooks/useSignUp";
import { useState } from "react";
import Loader from "../Component/loader";

const inputStyle =
     "bg-transparent outline-none border-[1px] border-zinc-600 w-[250px] px-3 py-1 rounded-md focus:ring-[1px] ring-sky-700 transition-all duration-200";

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
               <h1 className="w-[100%] text-center text-2xl">Sign Up</h1>
               <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-fit flex flex-col gap-4 bg-gradient-to-r from-zinc-700/10 via-zinc-800 to-zinc-700/20 py-5 px-4 rounded-md shadow-lg shadow-zinc-700/20"
               >
                    <input
                         className={inputStyle}
                         type="text"
                         id="username"
                         placeholder="username"
                         {...register("username", {
                              required: "username is required",
                         })}
                    />
                    <input
                         className={inputStyle}
                         type="text"
                         id="fullName"
                         placeholder="fullName"
                         {...register("fullName", {
                              required: "fullName is required",
                         })}
                    />
                    <input
                         className={inputStyle}
                         type="email"
                         id="email"
                         placeholder="email..."
                         {...register("email", {
                              required: "email is required",
                         })}
                    />
                    <input
                         className={inputStyle}
                         type="password"
                         id="password"
                         placeholder="password..."
                         {...register("password", {
                              required: "password is required",
                         })}
                    />
                    <input
                         className={inputStyle}
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
                    <label htmlFor="">avatar</label>
                    <input
                         className={inputStyle}
                         type="file"
                         id="avatar"
                         onChange={(e) => {
                              setAvatar(e.target.files[0]);
                         }}
                    />

                    <label htmlFor="">cover image</label>
                    <input
                         className={inputStyle}
                         id="coverImage"
                         type="file"
                         onChange={(e) => {
                              setCoverImage(e.target.files[0]);
                         }}
                    />
                    <span className="text-end cursor-pointer text-zinc-300">
                         forgot password?
                    </span>

                    <Button type="primary">Login</Button>
                    <NavLink to="/login">
                         Already have an account? login
                    </NavLink>
               </form>
          </div>
     );
}

export default SignUp;
