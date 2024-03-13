import tweetServices from "../../API/tweet.services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PER_PAGE } from "../../utils/consts";

export function useGetTweet() {
   const { getAllTweets } = tweetServices;

   const {
      data: allTweets,
      isLoading: loadingTweets,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
   } = useInfiniteQuery({
      queryFn: ({ pageParam }) => getAllTweets(pageParam),
      queryKey: ["tweets"],
      getNextPageParam: (lastPage) => {
         if (
            lastPage?.pageparam * PER_PAGE >=
            lastPage?.data?.data?.total + PER_PAGE + 10
         ) {
            return;
         }
         return lastPage?.pageparam + 1;
      },
   });

   return {
      allTweets: allTweets?.pages,
      loadingTweets,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
   };
}
