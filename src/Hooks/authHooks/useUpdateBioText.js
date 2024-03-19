import toast from "react-hot-toast";
import authservices from "../../API/auth.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBioText = () => {
   const queryClient = useQueryClient();
   const { UpdateBioText } = authservices;
   const { mutate: userUpdateText, isPending: isUpdating } = useMutation({
      mutationFn: (data) => UpdateBioText(data),
      onSuccess: () => {
         queryClient.invalidateQueries();
         toast.success("successfully updtrueated");
      },
      onError: (err) => {
         toast.error(err?.message);
      },
   });

   return { userUpdateText, isUpdating };
};
