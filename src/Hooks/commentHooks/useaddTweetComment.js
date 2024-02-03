import toast from "react-hot-toast";
import commentsServices from "../../API/comment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTweetComment() {
   const queryClient = useQueryClient();
   const { addTweetComment } = commentsServices;
   const { mutate: addTcomment, isPending: commentingTweet } = useMutation({
      mutationFn: ({ tweetId, content }) => addTweetComment(tweetId, content),
      onSuccess: () => {
         queryClient.invalidateQueries("tweetComments");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });
   return { addTcomment, commentingTweet };
}
