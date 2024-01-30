import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribe } from "../../API/subscribe.services";
import toast from "react-hot-toast";

export function useSubscribe() {
   const queryClient = useQueryClient();
   const {
      mutate: userSubscribe,
      data,
      isPending: loadingSubscribe,
   } = useMutation({
      mutationFn: subscribe,
      onSuccess: () => {
         queryClient.invalidateQueries(["getUser"]);
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });
   return { userSubscribe, data, loadingSubscribe };
}
