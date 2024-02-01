import { AiOutlineUpload } from "react-icons/ai";
import Button from "./Button";
import { useUpload } from "../Hooks/videoHooks/useUpload";
import MiniSpinner from "./MiniSpinner";
import { useState } from "react";

function InputFile() {
   const { userUploadVideo, isUploading } = useUpload();
   const [videoFile, setVideoFile] = useState(null);
   const [cover, setCover] = useState(null);
   const [title, setTitle] = useState("");

   function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", cover);
      formData.append("title", title);

      userUploadVideo(formData);
   }

   return (
      <form
         encType="multipart/form-data"
         onSubmit={handleSubmit}
         className="flex flex-col items-center gap-2 p-2 rounded-lg"
      >
         <input
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
         />
         <label
            htmlFor="videoFile"
            className="w-fit p-[4px] md:h-[30px] rounded-[100%] flex justify-center items-center cursor-pointer text-zinc-50 gap-3"
         >
            <p className="p-1">Choose a video file</p>
            <AiOutlineUpload
               size={20}
               fill="black"
               className="bg-lime-500 rounded-[100%] p-1"
            />
         </label>
         <input
            id="videoFile"
            type="file"
            name="videoFile"
            className="hidden"
            accept="video/mp4"
            onChange={(e) => setVideoFile(e.target.files[0])}
         />
         <label
            htmlFor="thumbnail"
            className="text-xs text-zinc-100 md:text-sm flex p-1 rounded-lg justify-center items-center cursor-pointer transition-all duration-200"
         >
            <p className="w-[100px] text-center">choose a thumbnail</p>
         </label>
         <input
            name="thumbnail"
            id="thumbnail"
            type="file"
            className="hidden"
            accept="image/jpeg, image/png"
            onChange={(e) => setCover(e.target.files[0])}
         />
         <Button disabled={isUploading} extrastyles="rounded-md" type="primary">
            {isUploading ? <MiniSpinner /> : "Upload"}
         </Button>
      </form>
   );
}

export default InputFile;