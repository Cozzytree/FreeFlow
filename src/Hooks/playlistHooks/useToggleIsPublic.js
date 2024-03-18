import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation } from "@tanstack/react-query";

export function useToggleIsPublic() {
   const { toggleIsPublic } = playlistservices;
   const { isPending: isToggling, mutate: togglePlaylistPublic } = useMutation({
      mutationFn: (playlistId) => toggleIsPublic(playlistId),
      onSuccess: () => {
         toast.success("success");
      },
      onError: (err) => {
         toast.error(err?.message);
      },
   });
   return { isToggling, togglePlaylistPublic };
}
