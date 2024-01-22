import { useParams } from "react-router";
import authservices from "../../API/auth.services";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
     const params = useParams();
     const { getUserProfile } = authservices;

     const {
          data: currentUser,
          isLoading: loadingUser,
          error,
     } = useQuery({
          queryFn: () => getUserProfile(params?.username),
          queryKey: ["getUser"],
     });
     return { currentUser, loadingUser, error };
}
