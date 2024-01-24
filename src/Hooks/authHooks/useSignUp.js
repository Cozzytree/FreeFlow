import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useSignUp() {
     const { signUp } = authservices;
     const navigate = useNavigate();
     const { mutate: userSignUp, isPending: loadingSignUp } = useMutation({
          mutationFn: (formData) => signUp(formData),
          onSuccess: () => {
               toast.success("success");
               navigate("/login");
          },
          onError: (error) => {
               toast.error(error?.message);
          },
     });
     return { userSignUp, loadingSignUp };
}
