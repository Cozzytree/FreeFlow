import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
     const navigate = useNavigate();
     const { login } = authservices;
     const {
          mutate: loginUser,
          data: userData,
          isPending: isLogging,
          error,
     } = useMutation({
          mutationFn: login,
          onSuccess: (data) => {
               toast.success("logged in success");
               navigate(`/u/${data?.data?.user?.username}`);
          },
          onError: () => {
               toast.error(error?.message);
          },
     });

     return { loginUser, userData, isLogging };
}
