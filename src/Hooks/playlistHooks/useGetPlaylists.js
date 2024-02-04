import playlistservices from "../../API/playlist.services";
import { useQuery } from "@tanstack/react-query";

export function useUserPlaylists() {
   const { getUserPlaylist } = playlistservices;
   const {
      data: userPlaylists,
      isLoading: isLoadingPlaylists,
      error,
   } = useQuery({
      queryFn: getUserPlaylist,
      queryKey: ["userPlaylists"],
   });
   return { userPlaylists, isLoadingPlaylists, error };
}
