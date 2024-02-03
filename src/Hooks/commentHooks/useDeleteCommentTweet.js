import toast from "react-hot-toast";
import commentsServices from "../../API/comment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTweetComment() {
   const queryClient = useQueryClient();
   const { deleteTweetComment } = commentsServices;
   const { mutate: deleteComment, isPending } = useMutation({
      mutationFn: (commentId) => deleteTweetComment(commentId),
      onSuccess: () => {
         queryClient.invalidateQueries("tweetComments");
         toast.success("successfully deleted");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });
   return { deleteComment, isPending };
}
