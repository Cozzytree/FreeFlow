import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MdOutlineRectangle } from "react-icons/md";
import VideoControls from "./VideoControls";
import ReactPlayer from "react-player";

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
   const [controlsVisible, setControlsVisible] = useState(false);
   const [volume, setVolume] = useState(1.0);
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      let videoRefrerence = videoRef?.current;
      function handlePlay(e) {
         if (e.code === "Space") {
            if (videoRef?.current?.paused) {
               videoRef.current.play();
            } else {
               videoRef?.current?.pause();
            }
         }
      }
      const updateProgress = () => {
         const currentTime = videoRef.current.currentTime;
         const duration = videoRef.current.duration;
         const progress = (currentTime / duration) * 100;
         setProgress(progress);
      };
      videoRefrerence.addEventListener("timeupdate", updateProgress);
      document.addEventListener("keydown", handlePlay);
      return () => {
         document.removeEventListener("keydown", handlePlay);
         videoRefrerence.removeEventListener("timeupdate", updateProgress);
      };
   }, []);

   function handlePlayPause() {
      if (videoRef.current.paused) {
         videoRef.current.play();
      } else {
         videoRef.current.pause();
      }
   }

   function toggleControls() {
      setControlsVisible((prevState) => !prevState);
      setTimeout(() => {
         setControlsVisible(false);
      }, 10000);
   }
   const debouncedHandleMouseMove = () => {
      setControlsVisible(true);
      setTimeout(() => {
         setControlsVisible(false);
      }, 10000);
   };

   function handleVolumeChange(event) {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume / 100);
      videoRef.current.volume = newVolume / 100;
   }

   return (
      <div
         onMouseEnter={toggleControls}
         onMouseMove={debouncedHandleMouseMove}
         className="bg-zinc-900 p-2 relative"
         style={{ background: poster }}
      >
         {/* <ReactPlayer
            url={src}
            controls
            light={poster}
            width={700}
            height={250}
            progressInterval={1000}
            playbackRate={1000}
         /> */}

         {controlsVisible && (
            <VideoControls
               videoRef={videoRef}
               handlePlayPause={handlePlayPause}
               handleVolumeChange={handleVolumeChange}
               progress={progress}
               volume={volume}
            />
         )}

         <video
            // onMouseMove={debouncedHandleMouseMove}
            ref={videoRef}
            poster={poster}
            src={src}
            className="videoPlayer w-[800px] h-[250px] md:h-[350px]"
            controlsList={controlsList}
         >
            <MdOutlineRectangle />
         </video>
      </div>
   );
}

export default VideoPlayer;
