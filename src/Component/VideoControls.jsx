import { FaPause, FaPlay } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { TbWindowMinimize } from "react-icons/tb";
import { useNavigate } from "react-router";
import { CgArrowsExpandUpLeft } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { useGlobalContext } from "../Hooks/context/globalContext";

function VideoControls({
   handlePlayPause,
   videoRef,
   handleVolumeChange,
   volume,
   progress,
   handleVideoTime,
   toggleFullscreen,
   handleVideoUrl,
}) {
   const minute = Math.floor(progress / 60);
   const seconds = Math.floor(progress % 60);
   const navigate = useNavigate();
   const { video, removeVideo, setVideoUrl } = useGlobalContext();
   const [toggleVol, setToggeleVol] = useState(false);

   const handleToggleVolume = () => {
      setToggeleVol((v) => !v);
   };

   return (
      <div className="absolute w-[100%] h-[100%] flex justify-center items-center bg-zinc-900/30 transition-all duration-500 z-10">
         <div className="w-[100%] absolute flex flex-col justify-center items-center gap-1 bottom-1 cursor-pointer">
            <input
               className="w-[100%] cursor-pointer h-[2px]"
               type="range"
               value={progress}
               onChange={(e) => handleVideoTime(e)}
               max={videoRef?.current?.duration || 0}
            />

            <div className="flex items-center w-[100%] gap-5 text-xs md:text-sm">
               <button
                  onClick={handlePlayPause}
                  className="flex justify-center items-center  h-[40px] w-[40px] p-2 cursor-pointer"
               >
                  {videoRef?.current && !videoRef?.current?.paused ? (
                     <FaPause />
                  ) : (
                     <FaPlay />
                  )}
               </button>

               <div
                  onMouseEnter={handleToggleVolume}
                  onMouseLeave={() => {
                     setToggeleVol(false);
                  }}
                  className="overflow-hidden grid grid-cols-[auto_1fr] items-center transition-all duration-200"
               >
                  <FaVolumeUp
                     className="w-[20px] z-[1]"
                     onClick={handleToggleVolume}
                  />

                  <input
                     className={`${
                        toggleVol
                           ? "translate-x-0 w-[50px] md:w-[100px] opacity-100"
                           : "translate-x-[-200px] w-[0px] opacity-0"
                     } origin-right transition-all h-1 duration-200 w-[50px] md:w-[100px] cursor-pointer`}
                     type="range"
                     max={100}
                     value={volume * 100}
                     onChange={handleVolumeChange}
                     onTouchStart={handleVolumeChange}
                  />
               </div>

               <span>
                  {minute} : {seconds >= 10 ? seconds : `0${seconds} `}/
                  {` ${Math.floor(Number(videoRef?.current?.duration / 60))}`} :
                  {Math.floor(Number(videoRef?.current?.duration % 60))}
               </span>

               <MdFullscreen
                  className="absolute bottom-4 right-5"
                  cursor="pointer"
                  size={20}
                  onClick={toggleFullscreen}
                  onTouchStart={toggleFullscreen}
               />
            </div>
         </div>

         {video?.src ? (
            <>
               <IoMdClose
                  onClick={removeVideo}
                  onTouchStart={removeVideo}
                  cursor="pointer"
                  className="absolute top-1 right-5"
                  size={15}
               />
               <CgArrowsExpandUpLeft
                  onClick={() => {
                     navigate(`/v/${video?.videoId}`);
                     setVideoUrl("");
                  }}
                  onTouchStart={() => {
                     navigate(`/v/${video?.videoId}`);
                     setVideoUrl("");
                  }}
                  cursor="pointer"
                  className="absolute top-1 right-10"
                  size={15}
               />
            </>
         ) : (
            <TbWindowMinimize
               onClick={() => {
                  handleVideoUrl();
                  navigate("/");
               }}
               onTouchStart={() => {
                  handleVideoUrl();
                  navigate("/");
               }}
               cursor="pointer"
               size={18}
               className="absolute bottom-5 right-20"
            />
         )}
      </div>
   );
}

export default VideoControls;
