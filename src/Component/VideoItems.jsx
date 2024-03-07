import VideoOptions from "./VideoOptions";
import Loader from "./loader";
import { useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import { useLazyImage } from "../Hooks/uiHooks/useLazyImage";

function VideoItems({
   v,
   children,
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
         className={`transition-all duration-300 flex flex-col p-5 gap-2 items-start bg-zinc-900/20`}
      >
         {isDeleting && <Loader />}
         {children && children}

         <div className="grid grid-cols-[1fr_auto] relative">
            <video
               onClick={() => {
                  navigate(`/v/${v?._id}`);
               }}
               data-src={v?.thumbnail}
               poster=""
               controlsList="nodownload nofullscreen nodocumentfile"
               className={`videos transition-all duration-200 w-[300px] h-[200px] object-scale-down rounded-md animate-slow cursor-pointer`}
               onMouseLeave={handleStopv}
               onMouseEnter={handlePlayV}
               src={isVideo ? v?.videoFile : ""}
               autoPlay
               muted
            ></video>
            <HiOutlineDotsVertical
               cursor="pointer"
               onClick={() => {
                  handleOption(index);
               }}
               className="h-[10px] w-[20px]"
            />
            {isOptions === index && (
               <VideoOptions setIsOptions={setIsOptions}>
                  {options && options}
               </VideoOptions>
            )}

            <span className="text-sm absolute bottom-1 right-2">
               {(v?.duration / 60).toFixed(2)}
            </span>
         </div>
         <div
            className="flex gap-3"
            onClick={() => navigate(`/u/${v?.user?.id}/videos`)}
         >
            {v?.user?.avatar && (
               <img
                  src={v?.user?.avatar}
                  alt="user img"
                  className="w-[30px] h-[30px] aspect-square rounded-[100%] gap-3"
               />
            )}

            <div>
               <p className="text-zinc-400 text-sm">{v?.title}</p>

               {v?.user?.username && (
                  <h2 className="text-sm text-zinc-200 cursor-pointer">
                     {v?.user?.username}
                  </h2>
               )}
            </div>
            <span className="text-sm text-zinc-400"> {v?.views} views</span>
         </div>
      </div>
   );
}

export default VideoItems;
