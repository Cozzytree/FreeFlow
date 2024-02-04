import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePlaylist() {
   const queryClient = useQueryClient();
   const { createPlaylist } = playlistservices;
   const { mutate: userCreatePlaylist, isPending: creatingPlaylist } =
      useMutation({
         mutationFn: (name) => createPlaylist(name),
         onSuccess: () => {
            queryClient.invalidateQueries(true);
            toast.success("playlist successfuly created");
         },
         onError: (error) => {
            toast.error(error.message);
         },
      });
   return { userCreatePlaylist, creatingPlaylist };
}
