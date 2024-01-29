import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribe } from "../../API/subscribe.services";
import toast from "react-hot-toast";

export function useSubscribe() {
   const queryClient = useQueryClient();
   const {
      mutate: userSubscribe,
      data,
      isPending: loadingSubscribe,
      error,
   } = useMutation({
      mutationFn: subscribe,
      onSuccess: () => {
         toast.success("subbed");
         queryClient.invalidateQueries(["getUser"]);
      },
   });
   console.log(data);
   return { userSubscribe, data, loadingSubscribe };
}
