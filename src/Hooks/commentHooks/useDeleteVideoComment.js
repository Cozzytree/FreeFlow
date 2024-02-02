import toast from "react-hot-toast";
import commentsServices from "../../API/comment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteVideoComment() {
   const { deleteVideoComment } = commentsServices;
   const queryClient = useQueryClient();
   const { mutate: deleteComment, isPending: isDeleting } = useMutation({
      mutationFn: (tweetId) => deleteVideoComment(tweetId),
      onSuccess: () => {
         queryClient.invalidateQueries("videoComments");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });
   return { deleteComment, isDeleting };
}
