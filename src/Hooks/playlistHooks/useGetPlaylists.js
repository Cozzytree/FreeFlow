import playlistservices from "../../API/playlist.services";
import { useQuery } from "@tanstack/react-query";

export function useUserPlaylists(videoId) {
   const { getUserPlaylist } = playlistservices;
   const {
      data: userPlaylists,
      isLoading: isLoadingPlaylists,
      error,
   } = useQuery({
      queryFn: () => getUserPlaylist(videoId),
      queryKey: ["userPlaylists"],
      enabled: !!videoId,
   });
   return { userPlaylists, isLoadingPlaylists, error };
}
