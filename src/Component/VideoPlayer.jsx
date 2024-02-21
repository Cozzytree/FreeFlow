import { createContext, useContext, useEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";

const VideoContext = createContext();

function VideoProvider({ children }) {
   const [video, setVideo] = useState("");
   function setVideoUrl(video) {
      setVideo(video);
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

function VideoPlayer({ src, poster, controlsList, videoId, ct }) {
   const videoRef = useRef(null);
   const [controlsVisible, setControlsVisible] = useState(false);
   const [videoTime, setVideoTime] = useState(
      videoRef?.current?.currentTime || 0
   );
   const { setVideoUrl } = useVideo();

   const [volume, setVolume] = useState(1.0);
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      // if (videoRef?.current) {
      //    videoRef?.current?.play();
      // }

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
         videoRef.current.currentTime = ct || 0;
         setProgress(videoRef.current.currentTime);
      };
      videoRefrerence.addEventListener("timeupdate", updateProgress);
      document.addEventListener("keydown", handlePlay);
      return () => {
         document.removeEventListener("keydown", handlePlay);
         videoRefrerence.removeEventListener("timeupdate", updateProgress);
      };
   }, [ct]);

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

   function toggleControls(e) {
      const target = e.touches ? e.touches[0].target : e.target;

      const isInput = target.tagName.toLowerCase() === "input";
      const isSvg = target.tagName.toLowerCase() === "svg";
      const isPath = target.tagName.toLowerCase() === "path";
      const isButton = target.tagName.toLowerCase() === "button";
      if (isInput || isSvg || isPath || isButton) {
         return;
      }

      setControlsVisible((prev) => !prev);
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

   function handleVideoUrl(video) {
      setVideoUrl(video);
   }

   return (
      <div
         onTouchStart={(e) => toggleControls(e)}
         onMouseEnter={(e) => toggleControls(e)}
         onMouseLeave={() => setControlsVisible(false)}
         className="bg-zinc-900 relative videoPlayer flex justify-center max-h-[300px]"
         style={{ background: poster }}
      >
         {controlsVisible && (
            <VideoControls
               handleVideoUrl={() =>
                  handleVideoUrl({ src, videoId, progress, poster })
               }
               videoRef={videoRef}
               handlePlayPause={handlePlayPause}
               handleVolumeChange={handleVolumeChange}
               progress={progress}
               volume={volume}
               videoTime={videoTime}
               handleVideoTime={handleVideoTime}
               toggleFullscreen={toggleFullscreen}
            ></VideoControls>
         )}

         <video
            ref={videoRef}
            poster={poster}
            src={src}
            className="videoPlayer object-contain"
            controlsList={controlsList}
         />
      </div>
   );
}

export default VideoPlayer;
