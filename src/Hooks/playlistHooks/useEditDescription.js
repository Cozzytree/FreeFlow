import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation } from "@tanstack/react-query";

export const useEditDescription = () => {
   const { editPlayDescription } = playlistservices;
   const { mutate: editPlaylistDescription, isPending: isEditingDescrip } =
      useMutation({
         mutationFn: ({ playlistId, description }) => {
            if (!playlistId || !description) {
               throw new Error("Invalid input parameters");
            }
            return editPlayDescription(playlistId, description);
         },
         onSuccess: () => {
            toast.success("successfully updated");
         },
         onError: (err) => {
            toast.error(err?.message);
         },
      });
   return { editPlaylistDescription, isEditingDescrip };
};
