import authservices from "../../API/auth.services";
import { useQuery } from "@tanstack/react-query";

export function useGetActiveUser() {
   const { settings } = authservices;
   const { data: userData, isLoading } = useQuery({
      queryFn: settings,
      queryKey: ["settings"],
   });
   return { userData, isLoading };
}
