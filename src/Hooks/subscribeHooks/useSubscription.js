import { subscription } from "../../API/subscribe.services";
import { useQuery } from "@tanstack/react-query";

export function useSubscription() {
   const { data: subbedTo, isLoading } = useQuery({
      queryFn: subscription,
      queryKey: ["subscription"],
   });
   return { subbedTo, isLoading };
}
