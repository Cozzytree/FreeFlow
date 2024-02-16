import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation } from "@tanstack/react-query";

export function useLoginOtp() {
   const { loginWithOtp } = authservices;
   const {
      mutate: loginwithOtp,
      isPending: isLoggingOtp,
      data,
   } = useMutation({
      mutationFn: (email) => loginWithOtp(email),
      onSuccess: () => {
         toast("otp send successfully");
      },
      onError: (err) => {
         toast.error(err.message);
      },
   });
   return { loginwithOtp, isLoggingOtp, data };
}
