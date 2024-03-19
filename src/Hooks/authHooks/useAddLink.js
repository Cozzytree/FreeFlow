import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddLink = () => {
   const queryClient = useQueryClient();
   const { addLinkToBio } = authservices;
   const { isPending: isAddingLink, mutate: userAddLink } = useMutation({
      mutationFn: (data) => addLinkToBio(data),
      onSuccess: () => {
         queryClient.invalidateQueries(true);
         toast.success("success");
      },
      onError: (err) => {
         toast.error(err?.message);
      },
   });

   return { isAddingLink, userAddLink };
};
