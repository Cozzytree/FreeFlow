import { useMutation, useQueryClient } from "@tanstack/react-query";
import authservices from "../../API/auth.services";
import toast from "react-hot-toast";

export function useClearWHistory() {
   const queryClient = useQueryClient();
   const { clearWatchHistory } = authservices;
   const { mutate: cWatchHistory, isPending: isClearing } = useMutation({
      mutationFn: clearWatchHistory,
      onSuccess: () => {
         toast.success("success");
         queryClient.invalidateQueries("watchHistory");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   return { cWatchHistory, isClearing };
}
