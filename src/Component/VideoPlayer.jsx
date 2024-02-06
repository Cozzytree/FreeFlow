import { createContext, useContext, useRef, useState } from "react";
import { MdOutlineRectangle } from "react-icons/md";

const VideoContext = createContext();

function VideoProvider({ children }) {
   const [video, setVideo] = useState("");
   function setVideoUrl(url) {
      console.log(url);
      setVideo(url);
   }

   function removeVideo() {
      setVideo("");
   }
   return (
      <VideoContext.Provider value={{ setVideoUrl, video, removeVideo }}>
         {children}
      </VideoContext.Provider>
   );
}

function useVideo() {
   return useContext(VideoContext);
}

export { VideoProvider, useVideo };

function VideoPlayer({ src, poster, controlsList }) {
   const videoRef = useRef(null);
   // const [isPlaying, setIsPlaying] = useState(false);
   // const [isMuted, setIsMuted] = useState(false);

   // const togglePlay = () => {
   //    console.log(videoRef?.current);
   //    if (videoRef?.current?.paused) {
   //       videoRef?.current?.play();
   //       setIsPlaying(true);
   //    } else {
   //       videoRef?.current?.pause();
   //       setIsPlaying(false);
   //    }
   // };

   // function skip() {
   //    if (videoRef.current) {
   //       videoRef.current.currentTime += 10;
   //    }
   // }

   // const toggleMute = () => {
   //    videoRef.current.muted = !videoRef.current.muted;
   //    setIsMuted(videoRef.current.muted);
   // };
   return (
      <div className="bg-zinc-900 p-2" style={{ background: poster }}>
         <video
            ref={videoRef}
            poster={poster}
            src={src}
            className="videoPlayer relative w-[800px] h-[250px] md:h-[350px]"
            controls
            controlsList={controlsList}
         >
            <MdOutlineRectangle />
         </video>
         {/* <div className="custom-controls">
            <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
            <button onClick={skip}>{isMuted ? "Unmute" : "Mute"}</button>
         </div> */}
      </div>
   );
}

export default VideoPlayer;
