import toast from "react-hot-toast";
import commentsServices from "../../API/comment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useVideoUpdateComment() {
   const queryClient = useQueryClient();
   const { updateVideoComment } = commentsServices;
   const { mutate: userUpdateVideoComment, isPending: isUpdatingVideoComment } =
      useMutation({
         mutationFn: ({ commentId, content }) =>
            updateVideoComment(commentId, content),
         onSuccess: () => {
            queryClient.invalidateQueries("videoComments");
            toast.success("updated successfully");
         },
         onError: (err) => {
            toast.error(err?.message);
         },
      });

   return { userUpdateVideoComment, isUpdatingVideoComment };
}
