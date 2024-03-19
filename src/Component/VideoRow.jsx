import { HiOutlineDotsVertical } from "react-icons/hi";
import VideoOptions from "./ItemOptions";
import { useNavigate } from "react-router";
import { useCallback } from "react";

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
         className="video w-[100%] grid grid-cols-[auto_auto_1fr_auto] gap-4 bg-zinc-800/40 p-3 rounded-md relative"
      >
         <span className="text-xs">{index + 1}</span>
         <img
            onClick={handleNavigate}
            src={video.thumbnail}
            alt="thumbnail"
            className="w-[200px] h-[100px] object-contain cursor-pointer"
         />
         <div
            onClick={handleNavigate}
            className="grid grid-rows-[1fr_auto] cursor-pointer"
         >
            <h2 className="text-xs md:text-md">{video.title}</h2>
            <h3 className="text-xs md:text-md">{video.user?.username}</h3>
         </div>
         <HiOutlineDotsVertical
            onClick={() => {
               handleOptions(index);
            }}
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
