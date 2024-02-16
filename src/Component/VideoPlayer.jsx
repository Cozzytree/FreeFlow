import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MdOutlineRectangle } from "react-icons/md";
import VideoControls from "./VideoControls";

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
   const [videoTime, setVideoTime] = useState(
      videoRef?.current?.currentTime || 0
   );

   const [volume, setVolume] = useState(1.0);
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      if (videoRef?.current) {
         videoRef?.current?.play();
      }

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
         setProgress(videoRef.current.currentTime);
      };
      videoRefrerence.addEventListener("timeupdate", updateProgress);
      document.addEventListener("keydown", handlePlay);
      return () => {
         document.removeEventListener("keydown", handlePlay);
         videoRefrerence.removeEventListener("timeupdate", updateProgress);
      };
   }, []);

   useEffect(() => {
      setVideoTime(videoRef?.current?.currentTime);
   }, [videoRef?.current?.currentTime]);

   function toggleFullscreen() {
      if (!document.fullscreenElement) {
         if (videoRef?.current.requestFullscreen) {
            videoRef?.current.requestFullscreen();
         } else if (videoRef?.current?.mozRequestFullScreen) {
            videoRef?.current.msRequestFullscreen();
         }
      } else {
         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
         } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
         }
      }
   }

   function handlePlayPause() {
      if (videoRef?.current.paused) {
         videoRef.current.play();
      } else {
         videoRef.current.pause();
      }
   }

   function toggleControls() {
      setControlsVisible((prevState) => !prevState);
      // setTimeout(() => {
      //    setControlsVisible(false);
      // }, 10000);
   }

   function handleVolumeChange(event) {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume / 100);
      videoRef.current.volume = newVolume / 100;
   }

   function handleVideoTime(e) {
      const value = e.target.value;
      setVideoTime(value);
      videoRef.current.currentTime = value;
   }

   return (
      <div
         onMouseEnter={toggleControls}
         onMouseLeave={() => setControlsVisible(false)}
         className="bg-zinc-900 p-2 relative videoPlayer"
         style={{ background: poster }}
      >
         {controlsVisible && (
            <VideoControls
               videoRef={videoRef}
               handlePlayPause={handlePlayPause}
               handleVolumeChange={handleVolumeChange}
               progress={progress}
               volume={volume}
               videoTime={videoTime}
               handleVideoTime={handleVideoTime}
               toggleFullscreen={toggleFullscreen}
            />
         )}

         <video
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
