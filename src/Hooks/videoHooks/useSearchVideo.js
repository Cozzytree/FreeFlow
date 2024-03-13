import videoservices from "../../API/video.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useSearchVideo() {
   const params = useParams();
   const { searchVideo } = videoservices;

   const {
      data: searchResults,
      isPending,
      refetch,
   } = useQuery({
      queryFn: () => searchVideo(params?.q),
      queryKey: ["searchResults"],
   });

   return { searchResults, isPending, refetch };
}
