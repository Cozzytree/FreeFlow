import authservices from "../../API/auth.services";
import { useQuery } from "@tanstack/react-query";

export function useGetWatchHistory() {
   const { getUserWatchHistory } = authservices;
   const { data: userWatchHistory, isLoading: loadingHistory } = useQuery({
      queryFn: getUserWatchHistory,
      queryKey: ["watchHistory"],
   });
   return { userWatchHistory, loadingHistory };
}
