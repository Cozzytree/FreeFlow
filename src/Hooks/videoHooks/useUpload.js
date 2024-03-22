import { useMutation, useQueryClient } from "@tanstack/react-query";
import videoservices from "../../API/video.services";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";

export function useUpload() {
   const { setGlobalLoading } = useGlobalContext();
   const queryClient = useQueryClient();
   const { uploadVideo } = videoservices;
   const { mutate: userUploadVideo, isPending: isUploading } = useMutation({
      mutationFn: (formData) => uploadVideo(formData),
      onSuccess: () => {
         queryClient.invalidateQueries("getUser");
         setGlobalLoading(false);
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   return { userUploadVideo, isUploading };
}
