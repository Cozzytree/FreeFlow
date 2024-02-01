import { useInfiniteQuery } from "@tanstack/react-query";
import commentsServices from "../../API/comment.services";
import { useParams } from "react-router";

export function useGetVideoComments() {
   const params = useParams();
   const { getVideoComments } = commentsServices;
   const {
      data: videoComments,
      isLoading,
      fetchNextPage,
   } = useInfiniteQuery({
      queryFn: () => getVideoComments({ videoId: params?.videoId }),
      queryKey: ["videoComments"],
      getNextPageParam: (lastPage) => {
         //     console.log(lastPage);
         //     lastPage + 1;
      },
   });

   return { videoComments, isLoading, fetchNextPage };
}
