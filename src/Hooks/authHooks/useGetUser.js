import { useParams } from "react-router";
import authservices from "../../API/auth.services";
import { useQuery } from "@tanstack/react-query";

export function useGetUser() {
     const params = useParams();
     const { getUser } = authservices;

     const {
          data: currentUser,
          isLoading: loadingUser,
          error,
     } = useQuery({
          queryFn: () => getUser(params?.username),
          queryKey: ["getUser"],
     });
     return { currentUser, loadingUser, error };
}