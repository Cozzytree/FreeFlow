import { NavLink } from "react-router-dom";
import Button from "../Component/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "../Hooks/authHooks/useLogin";
import { useState } from "react";
import LoginInputOtp from "../Component/LoginInputOtp";
import FormInput from "../Component/FormInput";
import Header from "../Component/Header";

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
         {withOtp ? (
            <LoginInputOtp handleWithOtp={handleWithOtp} />
         ) : (
            <div className="h-[100%] px-3 py-1 flex flex-col justify-center items-center">
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-fit flex flex-col items-center gap-4 bg-gradient-to-r bg-zinc-800/50 py-3 px-4 rounded-md shadow-lg "
               >
                  <Header>Login</Header>
                  <FormInput
                     register={register}
                     required={true}
                     id="email"
                     placeholder="youremail@email.com"
                     type="email"
                  />
                  <FormInput
                     type="password"
                     id="password"
                     register={register}
                     required={true}
                     placeholder="password"
                  />

                  <span className="text-end cursor-pointer text-zinc-300 ">
                     forgot password?
                  </span>
                  <Button
                     disabled={isLogging}
                     extrastyles={`rounded-sm text-xs h-[25px] ${
                        isLogging ? "animate-pulse cursor-wait" : ""
                     } `}
                     type="primary"
                  >
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
                     <span className="text-zinc-400 text-sm">
                        Don&apos;t have an account?
                     </span>
                     Sign Up
                  </NavLink>
               </form>
            </div>
         )}
      </>
   );
}

export default Login;
