import { FaPause, FaPlay } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { TbWindowMinimize } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useVideo } from "./VideoPlayer";
import { CgArrowsExpandUpLeft } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

function VideoControls({
   handlePlayPause,
   videoRef,
   handleVolumeChange,
   volume,
   progress,
   videoTime,
   handleVideoTime,
   toggleFullscreen,
   handleVideoUrl,
}) {
   const minute = Math.floor(progress / 60);
   const seconds = Math.floor(progress % 60);
   const navigate = useNavigate();
   const { video, removeVideo, setVideoUrl } = useVideo();

   return (
      <div className="absolute w-[100%] h-[100%] flex justify-center items-center">
         <button
            onTouchStart={handlePlayPause}
            onClick={handlePlayPause}
            className="flex justify-center items-center z-10 bg-zinc-800 h-[40px] w-[40px] rounded-[100%] p-2 cursor-pointer"
         >
            {videoRef?.current && !videoRef?.current?.paused ? (
               <FaPause />
            ) : (
               <FaPlay />
            )}
         </button>

         <input
            className="absolute bottom-[40%] w-[80px] right-3 rotate-[270deg] cursor-pointer z-10"
            type="range"
            max={100}
            value={volume * 100}
            onChange={handleVolumeChange}
            onTouchStart={handleVolumeChange}
         />
         <span className="absolute left-2 bottom-4 text-xs">
            {minute} : {seconds > 10 ? seconds : `0${seconds} `} /
            {` ${Math.floor(Number(videoRef?.current?.duration / 60))}`} :
            {Math.floor(Number(videoRef?.current?.duration % 60))}
         </span>

         <input
            className="absolute w-[60%] bottom-4 cursor-pointer z-10"
            type="range"
            value={videoTime}
            onChange={(e) => handleVideoTime(e)}
            max={videoRef?.current?.duration || 0}
         />

         <MdFullscreen
            cursor="pointer"
            className="z-10 absolute right-4 bottom-4"
            size={20}
            onClick={toggleFullscreen}
            onTouchStart={toggleFullscreen}
         />
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
            size={20}
            className="absolute bottom-4 z-10 right-[10%]"
         />
         {video?.src && (
            <>
               <IoMdClose
                  onClick={removeVideo}
                  onTouchStart={removeVideo}
                  cursor="pointer"
                  className="absolute top-1 right-5 z-10"
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
                  className="absolute top-1 right-10 z-10"
                  size={15}
               />
            </>
         )}
      </div>
   );
}

export default VideoControls;
