import videoservices from "../../API/video.services";
import { useQuery } from "@tanstack/react-query";

export function useSearchVideo(params) {
   const { searchVideo } = videoservices;
   const query = params.get("q");

   const {
      data: searchResults,
      isPending,
      refetch,
   } = useQuery({
      queryFn: () => searchVideo(query),
      queryKey: ["searchResults"],
   });

   return { searchResults, isPending, refetch };
}
