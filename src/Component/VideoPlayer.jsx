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

function VideoPlayer({ src, poster, controlsList, videoId, ct, progress }) {
   const videoRef = useRef(null);
   const [loadedPercentage, setLoadedPercentage] = useState(0);
   const [controlsVisible, setControlsVisible] = useState(false);
   const [videoTime, setVideoTime] = useState(
      videoRef?.current?.currentTime || 0
   );
   const { setVideoUrl } = useVideo();
   const [volume, setVolume] = useState(1.0);

   useEffect(() => {
      const videoReference = videoRef.current;
      videoReference.currentTime = ct || 0;
      function handlePlay(e) {
         if (e.code === "Space") {
            if (videoReference.paused) {
               videoReference.play();
            } else {
               videoReference.pause();
            }
         }
      }

      document.addEventListener("keydown", handlePlay);

      return () => {
         document.removeEventListener("keydown", handlePlay);
      };
   }, [ct]);

   useEffect(() => {
      // const updateLoadedPercentage = () => {
      //    if (videoRef.current) {
      //       const video = videoRef.current;
      //       const buffered = video.buffered;

      //       if (buffered.length > 0) {
      //          const loadedTimeRange = buffered.end(buffered.length - 1);
      //          const loadedPercentage =
      //             (loadedTimeRange / video.duration) * 100;
      //          setLoadedPercentage(loadedPercentage);
      //       }
      //    }
      // };

      // if (videoRef.current) {
      //    videoRef.current.addEventListener("progress", updateLoadedPercentage);
      // }
      setVideoTime(videoRef?.current?.currentTime);
      // console.log(loadedPercentage);

      // return () => {
      //    if (videoRef?.current) {
      //       videoRef?.current.removeEventListener(
      //          "progress",
      //          updateLoadedPercentage
      //       );
      //    }
      // };
   }, [loadedPercentage]);

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
      if (videoRef.current.paused) {
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
         className="bg-zinc-900 relative flex justify-center max-h-[300px]"
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
