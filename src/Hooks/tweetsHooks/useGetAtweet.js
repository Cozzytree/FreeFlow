import { useQuery } from "@tanstack/react-query";
import tweetServices from "../../API/tweet.services";
import { useParams } from "react-router";

export function useGetAtweet() {
   const { getATweet } = tweetServices;
   const params = useParams();
   const { data: atweet, isLoading: loadingTweet } = useQuery({
      queryFn: () => getATweet(params?.postId),
      queryKey: ["Atweet"],
   });
   return { atweet, loadingTweet };
}
