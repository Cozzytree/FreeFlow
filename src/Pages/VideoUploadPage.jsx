import { useState } from "react";
import Header from "../Component/Header";
import FormInput from "../Component/FormInput";
import { useForm } from "react-hook-form";
import FormTextArea from "../Component/FormTextArea";
import Button from "../Component/Button";
import { useUpload } from "../Hooks/videoHooks/useUpload";

function VideoUploadPage() {
   const [dragging, setDragging] = useState(false);
   const [videoFile, setVideoFile] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);
   const { userUploadVideo, isUploading } = useUpload();
   const { handleSubmit, register } = useForm();

   const handleDragOver = (e) => {
      e.preventDefault();
      setDragging(true);
   };

   const handleDragEnter = (e) => {
      e.preventDefault();
      setDragging(true);
   };

   const handleDragLeave = (e) => {
      e.preventDefault();
      setDragging(false);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);

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
      console.log(videoFile, thumbnail);
      console.log(data);

      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);
      formData.append("title", data.title);
      formData.append("description", data.description);
      userUploadVideo(formData);
   };

   return (
      <div className="w-full h-full flex justify-center items-center">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full bg-zinc-900 rounded-md gap-5 p-1 flex flex-col justify-center items-center"
         >
            {videoFile && (
               <p className="flex text-xs md:text-md">
                  <span>
                     Video File :
                     <em>
                        {videoFile?.name && videoFile.name.slice(0, 20) + "..."}
                     </em>
                  </span>
               </p>
            )}
            {thumbnail && (
               <p className="flex text-xs sm:text-md">
                  <span>
                     Thumbnail :
                     <em>
                        {thumbnail?.name &&
                           thumbnail?.name.slice(0, 20) + "..."}
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
               </div>
            )}
            {!videoFile && (
               <div
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="flex flex-col items-center"
               >
                  <Header>Drop Video File Here</Header>
                  <label
                     htmlFor="videoFile"
                     className={`bg-sky-400 text-zinc-900 cursor-pointer text-sm p-2 rounded-md ${
                        dragging ? "border-4 border-dashed border-blue-500" : ""
                     }`}
                  >
                     {dragging ? "Drop file here" : "Select File"}
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
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="flex flex-col items-center"
               >
                  <Header>Drop Thumbnail Here</Header>
                  <label
                     htmlFor="thumbnail"
                     className={`bg-sky-400 text-zinc-900 cursor-pointer text-sm p-2 rounded-md ${
                        dragging ? "border-4 border-dashed border-blue-500" : ""
                     }`}
                  >
                     {dragging ? "Drop file here" : "Select File"}
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
            <Button extrastyles="h-[25px] rounded-sm" type="primary">
               UPLOAD
            </Button>
         </form>
      </div>
   );
}

export default VideoUploadPage;
