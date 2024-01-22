import { useForm } from "react-hook-form";
import Button from "../Component/Button";
import { NavLink } from "react-router-dom";

const inputStyle =
     "bg-transparent outline-none border-[1px] border-zinc-600 w-[250px] px-3 py-1 rounded-md focus:ring-[1px] ring-sky-700 transition-all duration-200";

function SignUp() {
     const { handleSubmit, register } = useForm();
     function onSubmit(data) {
          const formData = new FormData();
          for (const key in data) {
               if (Array.isArray(data[key])) {
                    formData.append(key, data[key][0]);
               } else {
                    formData.append(key, data[key]);
               }
          }

          console.log(formData);
     }
     return (
          <div className="h-[100%] px-3 py-1 flex flex-col justify-center items-center animate-slow">
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
                         })}
                    />
                    <label htmlFor="">avatar</label>
                    <input
                         className={inputStyle}
                         type="file"
                         id="avatar"
                         {...register("avatar", { required: true })}
                    />

                    <label htmlFor="">cover image</label>
                    <input
                         className={inputStyle}
                         id="coverImage"
                         type="file"
                         {...register("coverImage", { required: true })}
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
