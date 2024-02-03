import toast from "react-hot-toast";
import videoservices from "../../API/video.services";
import { useMutation } from "@tanstack/react-query";

export function useUpdateVideo() {
    const { updateVideo } = videoservices;
    const { mutate: userUpdateVideo, isPending: isUpdating } = useMutation({
        mutationFn: ({ videoId, info }) => updateVideo(videoId, info),
        onSuccess: () => {
            toast.success("successfully updated");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { userUpdateVideo, isUpdating };
}
