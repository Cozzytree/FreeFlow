import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation } from "@tanstack/react-query";

export function useDeleteVfromPL() {
   const { removevideoFromPl } = playlistservices;
   const { mutate: removeV, isPending: isRemoving } = useMutation({
      mutationFn: ({ playlistId, videoId }) =>
         removevideoFromPl(playlistId, videoId),
      onSuccess: () => {
         toast.success("video successfully removed from the playlist");
      },
      onError: (error) => {
         toast.error(error?.message);
      },
   });
   return { removeV, isRemoving };
}
