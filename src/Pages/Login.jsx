import { NavLink } from "react-router-dom";
import Button from "../Component/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "../Hooks/authHooks/useLogin";
import Loader from "../Component/loader";
import { useState } from "react";
import LoginInputOtp from "../Component/LoginInputOtp";

function Login() {
   const { handleSubmit, register } = useForm();
   const { isLogging, loginUser } = useLogin();
   const [withOtp, setWithOtp] = useState(false);

   function onSubmit(data) {
      loginUser(data);
   }

   function handleWithOtp(v) {
      setWithOtp(v);
   }

   return (
      <>
         <h1 className="w-[100%] text-center text-2xl">Login</h1>
         {withOtp ? (
            <LoginInputOtp handleWithOtp={handleWithOtp} />
         ) : (
            <div className="h-[100%] px-3 py-1 flex flex-col justify-center items-center">
               {isLogging && <Loader />}

               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-fit] flex flex-col gap-4 bg-gradient-to-r from-zinc-700/10 via-zinc-800 to-zinc-700/20 py-5 px-4 rounded-md shadow-lg shadow-zinc-700/20"
               >
                  <input
                     className="bg-transparent outline-none border-[1px] border-zinc-600 w-[200px] px-3 py-1 rounded-md focus:ring-[1px] ring-sky-700 transition-all duration-200"
                     type="email"
                     id="email"
                     placeholder="email..."
                     {...register("email", {
                        required: "email is required",
                     })}
                  />
                  <input
                     className="bg-transparent outline-none border-[1px] border-zinc-600 w-[200px] px-3 py-1 rounded-md focus:ring-[1px] ring-sky-700 transition-all duration-200"
                     type="password"
                     id="password"
                     placeholder="password..."
                     {...register("password", {
                        required: "password is required",
                     })}
                  />
                  <span className="text-end cursor-pointer text-zinc-300 ">
                     forgot password?
                  </span>
                  <Button extrastyles="rounded-md text-sm" type="primary">
                     Login with password
                  </Button>
                  <span
                     onClick={() => {
                        handleWithOtp(true);
                     }}
                     className="text-sm text-zinc-400 cursor-pointer"
                  >
                     login with otp
                  </span>
                  <NavLink to="/signup">
                     Don&apos;t have an account Sign Up
                  </NavLink>
               </form>
            </div>
         )}
      </>
   );
}

export default Login;
