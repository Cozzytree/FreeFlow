import { useQuery } from "@tanstack/react-query";
import videoservices from "../../API/video.services";
import { useParams } from "react-router";
export function useRecommend() {
   const { recommends } = videoservices;
   const params = useParams();
   const {
      data: recommendV,
      isLoading,
      refetch,
   } = useQuery({
      queryFn: () => recommends(params?.videoId),
      queryKey: ["recommends"],
      enabled: false,
   });

   return { recommendV, isLoading, refetch };
}
