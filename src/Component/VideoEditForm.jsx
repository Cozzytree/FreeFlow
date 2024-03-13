import { FaCheck, FaEdit } from "react-icons/fa";
import ModalProvider from "./Modal";
import VideoOptionsItem from "./VideoOptionsItem";
import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import MiniSpinner from "./MiniSpinner";

function VideoEditForm({
   video,
   handleUpdateThumbnail,
   handleUpdateVideo,
   updatingVideo,
}) {
   const [thumbnail, setThumbnail] = useState(null);
   const { register, handleSubmit } = useForm();

   function videoUpdate(data) {
      handleUpdateVideo(video?._id, data);
   }
   return (
      <ModalProvider>
         <ModalProvider.ModalOpen opens="videoEdit">
            <VideoOptionsItem
               label="Edit"
               icon={<FaEdit className="w-full" />}
            />
         </ModalProvider.ModalOpen>
         <ModalProvider.ModalWindow window="videoEdit">
            <>
               <label
                  htmlFor="thumbnail"
                  className="modal text-zinc-50 p-4 cursor-pointer space-x-4"
               >
                  Change thumbnail
                  <input
                     onChange={(e) => setThumbnail(e.target.files[0])}
                     className="hidden"
                     type="file"
                     accept="image.jpg image.png"
                     id="thumbnail"
                  />
               </label>
               {thumbnail && (
                  <Button
                     onClick={() => {
                        handleUpdateThumbnail(video?._id, thumbnail);
                        setThumbnail("");
                     }}
                     extrastyles="text-green-500 font-extrabold"
                  >
                     <FaCheck />
                  </Button>
               )}

               <form
                  onSubmit={handleSubmit(videoUpdate)}
                  className="modal flex flex-col text-zinc-50 items-center gap-3"
               >
                  <FormInput
                     id="title"
                     register={register}
                     placeholder="Title"
                     defaultValue={video?.title}
                  />
                  <FormInput
                     id="description"
                     register={register}
                     defaultValue={video?.description}
                     placeholder="description..."
                  />

                  <label
                     className="flex gap-2 transition-all"
                     htmlFor="isPublished"
                  >
                     Published
                     <input
                        defaultChecked={video?.isPublished}
                        type="checkbox"
                        name=""
                        id="isPublished"
                        {...register("isPublished")}
                     />
                  </label>

                  <Button
                     disabled={updatingVideo}
                     type="primary"
                     extrastyles="rounded-sm h-[40px]"
                  >
                     {updatingVideo ? <MiniSpinner /> : "SAVE"}
                  </Button>
               </form>
            </>
         </ModalProvider.ModalWindow>
      </ModalProvider>
   );
}

export default VideoEditForm;
