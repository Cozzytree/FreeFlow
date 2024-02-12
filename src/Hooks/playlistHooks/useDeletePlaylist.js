import toast from "react-hot-toast";
import playlistservices from "../../API/playlist.services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useDeletePlaylist() {
   const navigate = useNavigate();
   const { deleteAplaylist } = playlistservices;
   const { mutate: userDeletePlaylist, isPending: isDeleting } = useMutation({
      mutationFn: (playlistId) => deleteAplaylist(playlistId),
      onSuccess: () => {
         toast.success("playlist successfully deleted");
         navigate("/");
      },
      onError: (error) => {
         toast.error(error?.message);
      },
   });
   return { userDeletePlaylist, isDeleting };
}
