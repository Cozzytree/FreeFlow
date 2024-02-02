import videoservices from "../../API/video.services";
import { useMutation } from "@tanstack/react-query";

export function useAddView() {
   const { addView } = videoservices;
   const { mutate: videoAddView } = useMutation({
      mutationFn: (videoId) => addView(videoId),
   });
   return { videoAddView };
}
