import { useParams } from "react-router";
import videoservices from "../../API/video.services";
import { useQuery } from "@tanstack/react-query";

export function useGetaVideo() {
     const params = useParams();

     const { getAvideo } = videoservices;
     const {
          data: video,
          isLoading: loadingVideo,
          error,
     } = useQuery({
          queryFn: () => getAvideo(params?.videoId),
          queryKey: ["Avideo"],
     });
     return { video, loadingVideo, error };
}
