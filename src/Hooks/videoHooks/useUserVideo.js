import { useParams } from "react-router";
import videoservices from "../../API/video.services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserVideo() {
   const queryClient = useQueryClient();
   const params = useParams();
   const { getUserVideo } = videoservices;
   const {
      data: userVideos,
      isLoading: loadingVideos,
      error,
   } = useQuery({
      queryFn: () => getUserVideo(params?.userId),
      queryKey: ["userVideo"],
      refetchOnMount: true,
   });

   const validateQuery = () => {
      queryClient.invalidateQueries("userVideo");
   };
   return { userVideos, loadingVideos, error };
}
