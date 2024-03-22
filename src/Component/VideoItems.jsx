import VideoOptions from "./ItemOptions";
import Loader from "./loader";
import { useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import { useLazyImage } from "../Hooks/uiHooks/useLazyImage";
import { time } from "../utils/time";

function VideoItems({
   v,
   index,
   isOptions,
   handleOption,
   options,
   setIsOptions,
}) {
   const [isVideo, setVideo] = useState(false);
   const { isDeleting } = useDeleteVideos();

   const navigate = useNavigate();
   const videoRef = useRef([]);

   useLazyImage(".videos", "data-src", v, "poster");

   function handlePlayV() {
      setVideo(true);
   }
   function handleStopv() {
      setVideo(false);
   }

   return (
      <div
         ref={(video) => (videoRef.current[+index] = video)}
         className={`w-full max-h-[300px] transition-all duration-300 flex flex-col px-3 pb-3 rounded-xl gap-2 justify-center`}
      >
         {isDeleting && <Loader />}

         <div className="w-full flex justify-center relative">
            <video
               onClick={() => {
                  navigate(`/v/${v?._id}`);
               }}
               data-src={v?.thumbnail}
               poster=""
               controlsList="nodownload nofullscreen nodocumentfile"
               className={`videos transition-all duration-200 w-[300px] h-[200px] object-cover rounded-md animate-slow cursor-pointer`}
               onMouseLeave={handleStopv}
               onMouseEnter={handlePlayV}
               src={isVideo ? v?.videoFile : ""}
               autoPlay
               muted
            ></video>

            <span className="text-sm absolute bottom-1 right-2">
               {v?.duration ? (v?.duration / 60).toFixed(2) : ""}
            </span>
         </div>

         <div className="flex gap-3 justify-between w-full relative">
            <div className="flex justify-between gap-2 text-xs sm:text-sm md:text-md">
               {v?.user?.avatar && (
                  <img
                     onClick={() => navigate(`/u/${v?.user?.id}/videos`)}
                     src={v?.user?.avatar}
                     alt="user img"
                     className="w-[35px] h-[35px] aspect-square rounded-[100%] gap-3"
                  />
               )}
               <div>
                  <p>{v?.title}</p>
                  {v?.user?.username && (
                     <h2
                        onClick={() => navigate(`/u/${v?.user?.id}/videos`)}
                        className="text-zinc-400 cursor-pointer"
                     >
                        {v?.user?.username}
                     </h2>
                  )}
                  <span className="text-zinc-400">
                     {v?.views} views - {v?.createdAt && time(v?.createdAt)}
                  </span>
               </div>
            </div>
            <HiOutlineDotsVertical
               cursor="pointer"
               onClick={() => {
                  handleOption(index);
               }}
               className="h-[10px] w-[10px]"
            />
            {isOptions === index ? (
               <VideoOptions setIsOptions={setIsOptions}>
                  {options && options}
               </VideoOptions>
            ) : null}
         </div>
      </div>
   );
}

export default VideoItems;
