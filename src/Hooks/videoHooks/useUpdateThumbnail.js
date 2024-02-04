import toast from "react-hot-toast";
import videoservices from "../../API/video.services";
import { useMutation } from "@tanstack/react-query";

export function useUpdateThumbnail() {
  const { updateThumbnail } = videoservices;
  const { mutate: userUpdateThumbnail, isPending: isUpdating } = useMutation({
    mutationFn: ({ videoId, formData }) => updateThumbnail(videoId, formData),
    onSuccess: () => {
      toast.success("thumbnail successfully updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { userUpdateThumbnail, isUpdating };
}
