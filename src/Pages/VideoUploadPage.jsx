import { useState } from "react";
import Header from "../Component/Header";
import FormInput from "../Component/FormInput";
import { useForm } from "react-hook-form";
import FormTextArea from "../Component/FormTextArea";
import Button from "../Component/Button";
import { useUpload } from "../Hooks/videoHooks/useUpload";
import { useGlobalContext } from "../Hooks/context/globalContext";
import { MdClose } from "react-icons/md";

function VideoUploadPage() {
   const { setGlobalLoading } = useGlobalContext();
   const [dragVideo, setDragVideo] = useState(false);
   const [dragImage, setDragImage] = useState(false);
   const [videoFile, setVideoFile] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);
   const { userUploadVideo, isUploading } = useUpload();
   const { handleSubmit, register } = useForm();

   const handleDragOver = (e, set) => {
      e.preventDefault();
      set(true);
   };

   const handleDragEnter = (e, set) => {
      e.preventDefault();
      set(true);
   };

   const handleDragLeave = (e, set) => {
      e.preventDefault();
      set(false);
   };

   const handleDrop = (e, set) => {
      e.preventDefault();
      set(false);

      const file = e.dataTransfer.files[0];
      if (file.type === "video/mp4") {
         setVideoFile(file);
      } else {
         setThumbnail(file);
      }
   };

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         console.log("Selected File Path:", selectedFile.name);
         setThumbnail(selectedFile);
      }
   };

   const onSubmit = (data) => {
      if (!videoFile || !thumbnail) return;

      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);
      formData.append("title", data.title);
      formData.append("description", data.description);
      setGlobalLoading(true);
      userUploadVideo(formData);
   };

   return (
      <div className="w-full h-full flex justify-center">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full bg-zinc-900 rounded-md gap-5 p-1 flex flex-col justify-center items-center"
         >
            {videoFile && (
               <p className="grid grid-rows-2 h-[50px] text-sm">
                  <span>
                     Video File :
                     <em className="flex items-center gap-2">
                        {videoFile?.name && videoFile.name.slice(0, 20) + "..."}
                        <MdClose
                           onClick={() => setVideoFile(null)}
                           cursor="pointer"
                           size={15}
                           color="red"
                        />
                     </em>
                  </span>
               </p>
            )}
            {thumbnail && (
               <p className="grid grid-rows-2 h-[50px] text-sm">
                  <span>
                     Thumbnail :
                     <em className="flex items-center gap-2">
                        {thumbnail?.name &&
                           thumbnail?.name.slice(0, 20) + "..."}
                        <MdClose
                           onClick={() => setThumbnail(null)}
                           cursor="pointer"
                           size={15}
                           color="red"
                        />
                     </em>
                  </span>
               </p>
            )}
            {videoFile && thumbnail && (
               <div className="text-sm flex flex-col gap-2">
                  <FormInput
                     type="text"
                     placeholder="Title..."
                     id="title"
                     register={register}
                     required={true}
                  />
                  <FormTextArea
                     placeholder="Description..."
                     id="description"
                     register={register}
                     required={true}
                  />
                  <Button
                     disabled={isUploading}
                     extrastyles={`${
                        isUploading && "cursor-wait"
                     } h-[25px] rounded-sm`}
                     type="primary"
                  >
                     {isUploading ? "uploading" : "upload"}
                  </Button>
               </div>
            )}
            {!videoFile && (
               <div
                  onDragOver={(e) => handleDragOver(e, setDragVideo)}
                  onDragEnter={(e) => handleDragEnter(e, setDragVideo)}
                  onDragLeave={(e) => handleDragLeave(e, setDragVideo)}
                  onDrop={(e) => handleDrop(e, setDragVideo)}
                  className="flex flex-col items-center w-[100%] h-[100px] p-2"
               >
                  <Header>Drop Video File Here</Header>
                  <label
                     htmlFor="videoFile"
                     className={`bg-sky-400 text-zinc-900 cursor-pointer text-sm p-2 rounded-md ${
                        dragVideo
                           ? "border-4 border-dashed border-blue-500"
                           : ""
                     }`}
                  >
                     {dragVideo ? "Drop file here" : "Select File"}
                  </label>
                  <input
                     onChange={(e) => setVideoFile(e.target.files[0])}
                     type="file"
                     id="videoFile"
                     className="hidden"
                     accept="video/mp4"
                  />
               </div>
            )}
            {!thumbnail && (
               <div
                  onDragOver={(e) => handleDragOver(e, setDragImage)}
                  onDragEnter={(e) => handleDragEnter(e, setDragImage)}
                  onDragLeave={(e) => handleDragLeave(e, setDragImage)}
                  onDrop={(e) => handleDrop(e, setDragImage)}
                  className="flex flex-col items-center w-[100%] h-[100px] p-2"
               >
                  <Header>Drop Thumbnail Here</Header>
                  <label
                     htmlFor="thumbnail"
                     className={`bg-sky-400 text-zinc-900 cursor-pointer text-sm p-2 rounded-md ${
                        dragImage
                           ? "border-4 border-dashed border-blue-500"
                           : ""
                     }`}
                  >
                     {dragImage ? "Drop file here" : "Select File"}
                  </label>
                  <input
                     onChange={handleFileChange}
                     type="file"
                     id="thumbnail"
                     className="hidden"
                     accept="image/jpg"
                  />
               </div>
            )}
         </form>
      </div>
   );
}

export default VideoUploadPage;
