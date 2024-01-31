import { useMutation } from "@tanstack/react-query";
import videoservices from "../../API/video.services";
import toast from "react-hot-toast";

export function useDeleteVideos() {
   const { deleteVideo } = videoservices;
   const {
      mutate: userDeleteVideo,
      data: deletedVideo,
      isPending: isDeleting,
   } = useMutation({
      mutationFn: (videoId) => deleteVideo(videoId),
      onSuccess: () => {
         toast.success("video successfully deleted");
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   return { userDeleteVideo, isDeleting, deletedVideo };
}
