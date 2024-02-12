import { NavLink } from "react-router-dom";
import Button from "../Component/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "../Hooks/authHooks/useLogin";
import Loader from "../Component/loader";
import { useEffect, useRef, useState } from "react";
const length = 5;

function Login() {
   const { handleSubmit, register } = useForm();
   const { isLogging, loginUser } = useLogin();
   const [otp, setOtp] = useState(new Array(length).fill(""));
   const inputRef = useRef([]);
   useEffect(() => {
      if (inputRef?.current) {
         inputRef?.current[0].focus();
      }
   }, []);

   function onSubmit(data) {
      loginUser(data);
   }

   function handleChange(index, e) {
      const value = e.target.value;
      if (isNaN(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1);
      console.log(newOtp, otp);
      setOtp(newOtp);

      if (value && index < length - 1 && inputRef.current[index + 1]) {
         inputRef.current[index + 1].focus();
      }
   }

   function handleClick(index) {
      inputRef.current[index].setSelectionRange(1, 1);
   }
   function handleBack(index, e) {
      if (
         e.key === "Backspace" &&
         index > 0 &&
         !otp[index] &&
         inputRef.current[index - 1]
      ) {
         inputRef.current[index - 1].focus();
      }
   }
   return (
      <>
         <div className="h-[100%] px-3 py-1 flex flex-col justify-center items-center">
            {isLogging && <Loader />}
            <h1 className="w-[100%] text-center text-2xl">Login</h1>
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
               <span className="text-end cursor-pointer text-zinc-300">
                  forgot password?
               </span>
               <Button extrastyles="rounded-md" type="primary">
                  Login
               </Button>
               <NavLink to="/signup">
                  Don&apos;t have an account Sign Up
               </NavLink>
            </form>
         </div>

         <div className="flex gap-3">
            {otp?.map((o, i) => (
               <input
                  ref={(input) => (inputRef.current[i] = input)}
                  // ref={inputRef}
                  onClick={() => handleClick(i)}
                  onChange={(e) => handleChange(i, e)}
                  onKeyDown={(e) => handleBack(i, e)}
                  type="text"
                  key={i}
                  value={o}
                  className="bg-transparent border-[1px] border-zinc-400 w-[30px] h-[30px] outline-none rounded-sm p-2 text-center text-xl"
               />
            ))}
         </div>
      </>
   );
}

export default Login;
