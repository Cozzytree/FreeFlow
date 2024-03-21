import playlistservices from "../../API/playlist.services";
import { useQuery } from "@tanstack/react-query";

export const usePublicPlaylist = (userId) => {
   const { getUserPublicPlaylists } = playlistservices;
   const {
      data: publicPlaylists,
      isLoading: isGettingpPlaylist,
      error: playlistError,
   } = useQuery({
      queryFn: () => getUserPublicPlaylists(userId),
      queryKey: ["publicPlaylists"],
   });
   return { publicPlaylists, isGettingpPlaylist, playlistError };
};
