import toast from "react-hot-toast";
import tweetServices from "../../API/tweet.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditTweet() {
    const queryClient = useQueryClient();
    const { editTweet } = tweetServices;
    const { isPending: isEditing, mutate: userEditTweet } = useMutation({
        mutationFn: ({ tweetId, content }) => editTweet(tweetId, content),
        onSuccess: () => {
            toast.success("successfully updated");
            queryClient.invalidateQueries(true);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { isEditing, userEditTweet };
}
