import { useNavigate } from "react-router";
import authservices from "../../API/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogout() {
     const queryClient = useQueryClient();
     const navigate = useNavigate();
     const { logout } = authservices;
     const {
          mutate: userLogout,
          error,
          isPending,
     } = useMutation({
          mutationFn: logout,
          onSuccess: () => {
               navigate("/");
               queryClient.setQueryData(["currentUser"], {});
          },
          onError: () => {
               toast.error(error.message);
          },
     });
     return { userLogout, isPending };
}
