import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation } from "@tanstack/react-query";

export function useEditPlayName() {
   const { editPlayName } = playlistservices;
   const { mutate: editPlaylistName, isPending: isEditing } = useMutation({
      mutationFn: ({ playlistId, name }) => editPlayName(playlistId, name),
      onSuccess: () => {
         toast.success("successfully updated");
      },
      onError: (err) => {
         toast.error(err.message);
      },
   });

   return { editPlaylistName, isEditing };
}
