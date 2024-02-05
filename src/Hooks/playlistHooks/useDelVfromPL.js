import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteVfromPL() {
   const queryClient = useQueryClient();
   const { removevideoFromPl } = playlistservices;
   const { mutate: removeV, isPending: isRemoving } = useMutation({
      mutationFn: ({ playlistId, videoId }) =>
         removevideoFromPl(playlistId, videoId),
      onSuccess: () => {
         queryClient.invalidateQueries(true);
         toast.success("video successfully removed from the playlist");
      },
      onError: (error) => {
         toast.error(error?.message);
      },
   });
   return { removeV, isRemoving };
}
