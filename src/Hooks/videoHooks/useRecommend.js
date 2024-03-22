import { useInfiniteQuery } from "@tanstack/react-query";
import videoservices from "../../API/video.services";
import { useParams } from "react-router";
export function useRecommend() {
   const { recommends } = videoservices;
   const params = useParams();
   const {
      data: recommendV,
      isLoading,
      refetch,
   } = useInfiniteQuery({
      queryFn: (pageparam) => recommends(params?.videoId, pageparam),
      queryKey: ["recommends"],
      getNextPageParam: (page) => {},
      enabled: true,
   });
   return { recommendV: recommendV?.pages, isLoading, refetch };
}
