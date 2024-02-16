import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useVerifyOtp() {
   const navigate = useNavigate();
   const { sendOtp } = authservices;
   const { mutate: otpToServer, isPending: isVerifying } = useMutation({
      mutationFn: ({ email, otp }) => sendOtp(email, otp),
      onSuccess: () => {
         toast.success("logged in successfully");
         navigate("/");
         localStorage.removeItem("email");
      },
      onError: (err) => {
         toast.error(err?.message);
      },
   });

   return { otpToServer, isVerifying };
}
