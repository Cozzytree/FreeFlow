import { useMutation, useQueryClient } from "@tanstack/react-query";
import likeservices from "../../API/likes.services";
import toast from "react-hot-toast";

export function useVideoLike() {
   const queryClient = useQueryClient();
   const { toggleLikeVideo } = likeservices;
   const { mutate: likeVideo, isPending: isLiking } = useMutation({
      mutationFn: (videoId) => toggleLikeVideo(videoId),
      onSuccess: () => {
         queryClient.invalidateQueries("Avideo");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   return { likeVideo, isLiking };
}
