import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import Button from "./Button";

function InputFile() {
   const { register, handleSubmit, getValues } = useForm();

   function onSubmit(data) {
      const formData = new FormData();
      formData.append("videoFile", data?.videoFile);
      formData.append("thumbnail", data?.thumbnail);
      console.log(getValues().videoFile);
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col items-center gap-2 p-2 rounded-lg"
      >
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
            className="hidden"
            accept="video/mp4"
            {...register("videoFile", { required: true })}
         />
         <label
            htmlFor="thumbnail"
            className="text-xs text-zinc-100 md:text-sm flex p-1 rounded-lg justify-center items-center cursor-pointer transition-all duration-200"
         >
            <p className="w-[100px] text-center">choose a thumbnail</p>
         </label>
         <input
            id="thumbnail"
            type="file"
            className="hidden"
            accept="image/jpeg, image/png"
            {...register("thumbnail", { required: true })}
         />
         <Button extrastyles="rounded-md" type="primary">
            Upload
         </Button>
      </form>
   );
}

export default InputFile;
