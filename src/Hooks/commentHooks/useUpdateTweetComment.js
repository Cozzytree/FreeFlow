import toast from "react-hot-toast";
import commentsServices from "../../API/comment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTweetComment() {
   const { updateTweetComment } = commentsServices;
   const queryClient = useQueryClient();
   const { mutate: userUpdateTweetComment, isPending: isEditingTweetComentm } =
      useMutation({
         mutationFn: ({ commentId, content }) =>
            updateTweetComment({ commentId, content }),
         onSuccess: () => {
            queryClient.invalidateQueries("tweetComments");
            toast.success("updated successfully");
         },
         onError: (err) => {
            toast.error(err?.message);
         },
      });

   return { userUpdateTweetComment, isEditingTweetComentm };
}
