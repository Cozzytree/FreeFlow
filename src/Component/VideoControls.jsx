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
   loaded,
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
      <div className="absolute w-full h-full flex justify-center items-center bg-zinc-900/30 transition-all duration-500 z-10">
         <div className="w-full absolute flex flex-col justify-center items-center gap-1 bottom-1 cursor-pointer">
            <div className="w-full bottom-0 left-0 right-0 h-4 relative">
               <input
                  style={{ WebkitAppearance: "none", zIndex: "10" }}
                  className="w-full absolute cursor-pointer h-[5px] z-[2]"
                  type="range"
                  value={progress}
                  onChange={(e) => handleVideoTime(e)}
                  max={videoRef?.current?.duration || 0}
               />
               <div
                  className="h-[5px] w-full bg-red-500 opacity-75 absolute" // Adjust opacity here
                  style={{
                     width: `${
                        (videoRef?.current?.currentTime /
                           videoRef?.current?.duration) *
                        100
                     }%`,
                  }}
               ></div>
               <div
                  className="h-[5px] w-full bg-gray-400 opacity-40 absolute" // Adjust opacity here
                  style={{ width: `${loaded}%` }}
               ></div>
            </div>

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
                  className="overflow-hidden flex items-center transition-all duration-200"
               >
                  <FaVolumeUp
                     className="w-[20px] z-[1]"
                     onClick={handleToggleVolume}
                  />

                  <input
                     className={`${
                        toggleVol ? "block" : "hidden"
                     } origin-right w-[50px] transition-all h-1 duration-200 cursor-pointer`}
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
