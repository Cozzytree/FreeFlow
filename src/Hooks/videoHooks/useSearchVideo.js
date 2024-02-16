import videoservices from "../../API/video.services";
import { useMutation } from "@tanstack/react-query";

export function useSearchVideo() {
   const { searchVideo } = videoservices;
   const {
      data: searchResults,
      mutate: search,
      isPending,
   } = useMutation({
      mutationFn: (q) => searchVideo(q),
   });
   return { searchResults, search, isPending };
}
