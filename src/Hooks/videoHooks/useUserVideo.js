import videoservices from "../../API/video.services";
import { useQuery } from "@tanstack/react-query";

export function useUserVideo() {
     const { getUserVideo } = videoservices;
     const {
          data: userVideos,
          isLoading: loadingVideos,
          error,
     } = useQuery({
          queryFn: getUserVideo,
          queryKey: ["userVideo"],
     });
     return { userVideos, loadingVideos, error };
}
