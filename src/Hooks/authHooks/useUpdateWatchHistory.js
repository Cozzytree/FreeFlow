import { useMutation, useQueryClient } from "@tanstack/react-query";
import authservices from "../../API/auth.services";

export function useUpdateWatchHistory() {
   const queryClient = useQueryClient();
   const { updateWatchHistory } = authservices;

   const { mutate: addToWatchHistory } = useMutation({
      mutationFn: (videoId) => updateWatchHistory(videoId),
      onSuccess: () => {
         queryClient.invalidateQueries("Avideo");
      },
   });
   return { addToWatchHistory };
}
