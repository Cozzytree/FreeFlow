import { FaPause, FaPlay } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

function VideoControls({
   handlePlayPause,
   videoRef,
   handleVolumeChange,
   volume,
   progress,
   videoTime,
   handleVideoTime,
   toggleFullscreen,
}) {
   return (
      <div className="absolute w-[100%] h-[100%] flex justify-center items-center">
         <button
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
            className="absolute bottom-5 left-60 cursor-pointer z-10"
            type="range"
            max={100}
            value={volume * 100}
            onChange={handleVolumeChange}
         />
         {Number(progress).toFixed(0)}
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
         />

         {Number(videoRef?.current?.duration / 60).toFixed(2)}
      </div>
   );
}

export default VideoControls;
