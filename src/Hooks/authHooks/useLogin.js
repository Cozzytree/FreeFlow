import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
     const queryClient = useQueryClient();
     const navigate = useNavigate();
     const { login } = authservices;
     const {
          mutate: loginUser,
          data: userData,
          isPending: isLogging,
     } = useMutation({
          mutationFn: login,
          onSuccess: (data) => {
               console.log(data);
               toast.success("logged in success");
               queryClient.invalidateQueries("currentUser");
               queryClient.setQueryData(["currentUser"], data?.data);
               navigate(`/`);
          },
          onError: (error) => {
               toast.error(error?.message);
          },
     });
     return { loginUser, userData, isLogging };
}
