import tweetServices from "../../API/tweet.services";
import { useQuery } from "@tanstack/react-query";

export function useGetTweet() {
     const { getAllTweets } = tweetServices;

     const { data: allTweets, isLoading: loadingTweets } = useQuery({
          queryFn: () => getAllTweets(),
          queryKey: ["tweets"],
     });
     return { allTweets, loadingTweets };
}
