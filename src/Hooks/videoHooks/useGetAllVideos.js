import videoservices from "../../API/video.services";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useAllVideos() {
   const { getAllVideos } = videoservices;
   const {
      data: allVideos,
      isLoading: loadingVideos,
      fetchNextPage,
      error,
   } = useInfiniteQuery({
      queryFn: getAllVideos,
      queryKey: ["videos"],
      getNextPageParam: (lastpage) => {},
   });

   return { allVideos, loadingVideos, error, fetchNextPage };
}
