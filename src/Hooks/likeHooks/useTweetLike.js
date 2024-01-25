import toast from "react-hot-toast";
import likeservices from "../../API/likes.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLikeTweet() {
     const queryClient = useQueryClient();
     const { toggleLikeTweet } = likeservices;

     const {
          data: tweetLikeData,
          isPending: loadingTweetlike,
          mutate: toggleTweet,
     } = useMutation({
          mutationFn: (tweetId) => toggleLikeTweet(tweetId),
          onSuccess: () => {
               queryClient.invalidateQueries(["tweets"]);
          },
          onError: (error) => {
               toast.error(error.message);
          },
     });

     return {
          loadingTweetlike,
          tweetLikeData,
          toggleTweet,
     };
}
