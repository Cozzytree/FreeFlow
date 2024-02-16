import { useEffect, useRef, useState } from "react";
import { useLoginOtp } from "../Hooks/authHooks/useLoginWithOtp";
import Button from "./Button";
import Loader from "./loader";
import { useVerifyOtp } from "../Hooks/authHooks/useVerifyLogin";
const length = 6;

function LoginInput({ handleWithotpInput }) {
   const [otpInput, setotpInput] = useState(new Array(length).fill(""));
   const [email, setEmail] = useState("");
   const { loginwithOtp, isLoggingotpInput } = useLoginOtp();
   const { isVerifying, otpToServer } = useVerifyOtp();
   const inputRef = useRef([]);

   useEffect(() => {
      if (inputRef?.current) {
         inputRef?.current[0]?.focus();
      }
   }, []);

   const handleSendEmail = () => {
      if (!email) return;
      localStorage.setItem("email", email);
      loginwithOtp(email);
   };

   function handleChange(index, e) {
      const value = e.target.value;
      if (isNaN(value)) return;

      const newotpInput = [...otpInput];
      newotpInput[index] = value.substring(value.length - 1);
      setotpInput(newotpInput);

      if (newotpInput.join("")?.length === 6) {
         otpToServer({
            email: localStorage.getItem("email"),
            otp: +newotpInput.join(""),
         });
      }

      if (value && index < length - 1 && inputRef?.current[index + 1]) {
         inputRef?.current[index + 1].focus();
      }
   }

   function handleClick(index) {
      inputRef.current[index].setSelectionRange(1, 1);
   }

   function handleBack(index, e) {
      if (
         e.key === "Backspace" &&
         index > 0 &&
         !otpInput[index] &&
         inputRef.current[index - 1]
      ) {
         inputRef.current[index - 1].focus();
      }
   }

   return (
      <div className="flex gap-3 flex-col h-[200px] justify-center items-center">
         {isLoggingotpInput && <Loader />}
         <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email..."
            className="bg-transparent outline-none border-[1px] border-zinc-600 p-1"
         />
         <Button
            onClick={handleSendEmail}
            type="primary"
            extrastyles="h-[20px] rounded-sm text-sm"
         >
            Send otpInput
         </Button>
         <span
            onClick={() => handleWithotpInput(false)}
            className="cursor-pointer text-sm text-zinc-400"
         >
            Login with password
         </span>
         {localStorage.getItem("email") && (
            <div className="flex gap-2">
               {otpInput?.map((o, i) => (
                  <input
                     ref={(input) => (inputRef.current[i] = input)}
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
         )}
      </div>
   );
}

export default LoginInput;
