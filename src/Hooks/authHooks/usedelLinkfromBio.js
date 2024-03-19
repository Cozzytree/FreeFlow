import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDelLink = () => {
   const queryClient = useQueryClient();
   const { deleteLinkFromBio } = authservices;
   const { mutate: userDelLink, isPending: isDeleting } = useMutation({
      mutationFn: (id) => deleteLinkFromBio(id),
      onSuccess: () => {
         queryClient.invalidateQueries(true);
         toast.success("successfully deleted");
      },
      onError: (err) => {
         toast.error(err?.message);
      },
   });

   return { userDelLink, isDeleting };
};
