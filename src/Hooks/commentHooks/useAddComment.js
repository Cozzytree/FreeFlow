import toast from "react-hot-toast";
import commentsServices from "../../API/comment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddVideoComment() {
   const queryClient = useQueryClient();
   const { addVideoComment } = commentsServices;
   const { mutate: addComment, isPending: isComenting } = useMutation({
      mutationFn: ({ videoId, content }) => addVideoComment(videoId, content),
      onSuccess: () => {
         queryClient.invalidateQueries("videoComments");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });
   return { addComment, isComenting };
}
