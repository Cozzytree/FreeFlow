import authservices from "../../API/auth.services";
import { useQuery } from "@tanstack/react-query";
export function useCurrentUser() {
     const { getCurrentUser } = authservices;
     const {
          data: currentUser,
          isLoading: loadingCurrentUser,
          error,
     } = useQuery({
          queryFn: () => getCurrentUser(),
          queryKey: ["currentUser"],
          retry: false,
     });
     return { currentUser, loadingCurrentUser, error };
}
