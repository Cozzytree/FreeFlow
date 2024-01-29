import { useParams } from "react-router";
import videoservices from "../../API/video.services";
import { useQuery } from "@tanstack/react-query";

export function useUserVideo() {
     const params = useParams();
     const { getUserVideo } = videoservices;
     const {
          data: userVideos,
          isLoading: loadingVideos,
          error,
     } = useQuery({
          queryFn: () => getUserVideo(params?.userId),
          queryKey: ["userVideo"],
     });
     return { userVideos, loadingVideos, error };
}
