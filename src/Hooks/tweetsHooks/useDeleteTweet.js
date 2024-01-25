import { useMutation, useQueryClient } from "@tanstack/react-query";
import tweetServices from "../../API/tweet.services";
import toast from "react-hot-toast";

export function useDeleteTweet() {
     const queryClient = useQueryClient();
     const { deleteTweet } = tweetServices;
     const { mutate: userDeleteTweet, isPending: deletingTweet } = useMutation({
          mutationFn: (tweeId) => deleteTweet(tweeId),
          onSuccess: () => {
               toast.success("successfully deleted");
               queryClient.invalidateQueries(["tweets"]);
          },
          onError: (error) => {
               toast.error(error?.message);
          },
     });
     return { userDeleteTweet, deletingTweet };
}
