import toast from "react-hot-toast";
import tweetServices from "../../API/tweet.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTweet() {
   const queryClient = useQueryClient();
   const { addTweet } = tweetServices;
   const {
      mutate: useraddTweet,
      isPending: loadingaddTweet,
      data,
   } = useMutation({
      mutationFn: (data) => addTweet(data),
      onSuccess: () => {
         toast.success("tweet success");
         queryClient.invalidateQueries(["tweets"]);
      },
      onError: (error) => {
         toast.error(error?.message);
      },
   });

   return { data, useraddTweet, loadingaddTweet };
}
