import { useParams } from "react-router";
import tweetServices from "../../API/tweet.services";
import { useQuery } from "@tanstack/react-query";

export function useGetUserTweets() {
     const { getUserTweets } = tweetServices;
     const params = useParams();
     const {
          data: userTweets,
          isLoading: loadingUserTweets,
          error,
     } = useQuery({
          queryFn: () => getUserTweets(params?.userId),
          queryKey: ["userTweets"],
     });

     return { userTweets, loadingUserTweets, error };
}
