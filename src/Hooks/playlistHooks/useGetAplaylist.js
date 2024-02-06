import { useParams } from "react-router";
import playlistservices from "../../API/playlist.services";
import { useQuery } from "@tanstack/react-query";

export function useGetAplaylist() {
   const params = useParams();
   const { getAplaylist } = playlistservices;
   const {
      data: aPlaylist,
      isLoading: loadingPlaylist,
      error,
      refetch,
   } = useQuery({
      queryFn: () => getAplaylist(params?.playlistId),
      queryKey: ["Aplaylist"],
      enabled: false,
   });

   return { refetch, aPlaylist, loadingPlaylist, error };
}
