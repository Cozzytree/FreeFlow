import commentsServices from "../../API/comment.services";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetTweetComments(tweetId) {
   const { getTweetComments } = commentsServices;

   const {
      isLoading,
      data: tweetComments,
      fetchNextPage,
   } = useInfiniteQuery({
      queryFn: () => getTweetComments({ tweetId }),
      queryKey: ["tweetComments", tweetId],
      getNextPageParam: (lastPage) => {
         //     console.log(lastPage);
         //     lastPage + 1;
      },
   });

   return { isLoading, tweetComments, fetchNextPage };
}
