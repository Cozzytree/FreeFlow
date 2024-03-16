import { useParams } from "react-router";
import authservices from "../../API/auth.services";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
   const { getUserProfile } = authservices;
   const params = useParams();

   const {
      data: currentUser,
      isLoading: loadingUser,
      error,
      refetch,
   } = useQuery({
      queryFn: () => getUserProfile(params?.userId),
      queryKey: ["getUser"],
   });
   return { currentUser, loadingUser, error, refetch };
}
