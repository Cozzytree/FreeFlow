import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation } from "@tanstack/react-query";

export function useAddVtoPL() {
   const { addVideoToP } = playlistservices;
   const { isPending: isAddingVtoPl, mutate: userAddVtoPL } = useMutation({
      mutationFn: ({ playlistId, videoId }) => addVideoToP(playlistId, videoId),
      onSuccess: () => {
         toast.success("video successfully added to playlist");
      },
      onError: (error) => {
         toast.error(error?.message);
      },
   });
   return { isAddingVtoPl, userAddVtoPL };
}
