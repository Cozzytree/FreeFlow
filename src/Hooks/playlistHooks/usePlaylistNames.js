import playlistservices from "../../API/playlist.services";
import { useQuery } from "@tanstack/react-query";

export function usePlaylistNames() {
   const { getPlaylistName } = playlistservices;
   const { data: playlistNames, isLoading } = useQuery({
      queryFn: () => getPlaylistName(),
      queryKey: ["playlistNames"],
   });
   return { playlistNames, isLoading };
}
