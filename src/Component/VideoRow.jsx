import { HiOutlineDotsVertical } from "react-icons/hi";
import VideoOptions from "./ItemOptions";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { time } from "../utils/time";

function VideoRow({
   video,
   index,
   handleOptions,
   isOptions,
   options,
   setOption,
}) {
   const navigate = useNavigate();
   const handleNavigate = useCallback(() => {
      if (video && video._id) {
         navigate(`/v/${video._id}`);
      }
   }, [navigate, video]);

   return (
      <div
         draggable={true}
         className="video w-[100%] grid grid-cols-[auto_1fr_auto] gap-4 bg-zinc-800/40 p-3 rounded-md relative"
      >
         <img
            onClick={handleNavigate}
            src={video.thumbnail}
            alt="thumbnail"
            className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover rounded-lg cursor-pointer"
         />
         <div
            onClick={handleNavigate}
            className="flex flex-col cursor-pointer text-xs sm:text-sm md:text-md"
         >
            <h2 className="text-md md:text-xl">{video.title}</h2>
            <p className="flex gap-2 text-zinc-400">
               <span>{video?.views} views - </span>
               <em> {video?.createdAt && time(video?.createdAt)}</em>
            </p>
            <div className="flex gap-2 items-center text-zinc-400">
               <img
                  className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full"
                  src={video?.user?.avatar}
                  alt=""
               />
               <h3>{video.user?.username}</h3>
            </div>
         </div>
         <HiOutlineDotsVertical
            onClick={() => {
               handleOptions(index);
            }}
            size={15}
            className="z-10"
            cursor="pointer"
         />

         {index === isOptions && (
            <VideoOptions setIsOptions={setOption} outsideClose={true}>
               {options ?? null}
            </VideoOptions>
         )}
      </div>
   );
}

export default VideoRow;
