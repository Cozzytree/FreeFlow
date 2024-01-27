import videoservices from "../../API/video.services";
import { useQuery } from "@tanstack/react-query";

export function useAllVideos() {
     const { getAllVideos } = videoservices;
     const {
          data: allVideos,
          isLoading: loadingVideos,
          error,
     } = useQuery({
          queryFn: getAllVideos,
          queryKey: ["videos"],
     });

     return { allVideos, loadingVideos, error };
}
