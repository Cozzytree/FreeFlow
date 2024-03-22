import { useEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";
import { useGlobalContext } from "../Hooks/context/globalContext";
import { useNavigate } from "react-router";

function VideoPlayer({
   src,
   poster,
   controlsList,
   videoId,
   ct,
   params,
   recommend,
   addViewHandler,
   addWatchHandler,
}) {
   const [progress, setProgress] = useState(0);
   const [isView, setIsView] = useState(false);
   const navigate = useNavigate();
   const videoRef = useRef(null);
   const [loadedPercentage, setLoadedPercentage] = useState(0);
   const [controlsVisible, setControlsVisible] = useState(false);
   const { setVideoUrl } = useGlobalContext();
   const [volume, setVolume] = useState(null);

   useEffect(() => {
      if (localStorage.getItem("vol")) {
         videoRef.current.volume =
            JSON.parse(localStorage.getItem("vol")) / 100;
         setVolume(videoRef?.current?.volume);
      }
   }, []);

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
      const videoElement = videoRef?.current;
      const updateLoadedPercentage = () => {
         if (videoElement) {
            const { buffered, duration } = videoElement;

            if (buffered.length > 0) {
               const loadedTimeRange = buffered.end(buffered.length - 1);
               const loadedPercentage = (loadedTimeRange / duration) * 100;
               setLoadedPercentage(loadedPercentage);
            }
         }
      };

      if (videoRef?.current) {
         videoElement.addEventListener("progress", updateLoadedPercentage);
      }

      if (videoRef?.current) {
         return () =>
            videoElement.removeEventListener(
               "progress",
               updateLoadedPercentage
            );
      }
   }, [loadedPercentage]);

   useEffect(() => {
      const videoElement = videoRef?.current;
      const handleTimeUpdate = () => {
         if (!videoElement) return;

         const { duration, currentTime } = videoElement;
         const watchedPercentage = (currentTime / duration) * 100;
         setProgress(currentTime);
         if (watchedPercentage >= 15 && !isView) {
            addViewHandler(params?.videoId);
            addWatchHandler(params?.videoId);
            setIsView(true);
         }
         if (currentTime === duration && recommend) {
            navigate(`/v/${recommend?.data?.videos[0]?._id}`);
            videoElement.currentTime = 0;
         }
      };

      if (videoElement) {
         videoElement.addEventListener("timeupdate", handleTimeUpdate);
         videoElement.scrollIntoView({ behavior: "smooth" });
      }

      return () => {
         if (videoElement) {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
         }
      };
   }, [
      params?.videoId,
      isView,
      addWatchHandler,
      addViewHandler,
      navigate,
      recommend,
   ]);

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

   function toggleControlsMouse(e) {
      const target = e.target;
      const isInput = target.tagName.toLowerCase() === "input";
      const isSvg = target.tagName.toLowerCase() === "svg";
      const isPath = target.tagName.toLowerCase() === "path";
      const isButton = target.tagName.toLowerCase() === "button";

      if (isInput || isSvg || isPath || isButton) {
         return;
      }

      setControlsVisible((prev) => !prev);
   }

   function toggleControlsTouch(e) {
      const target = e.target;
      const isInput = target.tagName.toLowerCase() === "input";
      const isSvg = target.tagName.toLowerCase() === "svg";
      const isPath = target.tagName.toLowerCase() === "path";
      const isButton = target.tagName.toLowerCase() === "button";

      if (isInput || isSvg || isPath || isButton) {
         return;
      }
      if (controlsVisible) setControlsVisible(false);
      else setControlsVisible(true);
   }

   function handleVolumeChange(event) {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume / 100);
      localStorage.setItem("vol", newVolume);
      videoRef.current.volume = newVolume / 100;
   }

   function handleProgress(e) {
      const value = e.target.value;
      setProgress(value);
      videoRef.current.currentTime = value;
   }

   function handleVideoUrl(video) {
      setVideoUrl(video);
   }

   return (
      <div
         onClick={(e) => toggleControlsTouch(e)}
         onMouseEnter={(e) => toggleControlsMouse(e)}
         onMouseLeave={() => setControlsVisible(false)}
         className={`relative flex justify-center min-w-[500px] max-h-[350px] rounded-xl shadow-zinc-800 shadow-xl`}
         style={{ background: poster }}
      >
         {controlsVisible && (
            <VideoControls
               loaded={loadedPercentage}
               handleVideoUrl={() =>
                  handleVideoUrl({ src, videoId, progress, poster })
               }
               videoRef={videoRef}
               handlePlayPause={handlePlayPause}
               handleVolumeChange={handleVolumeChange}
               progress={progress}
               volume={volume}
               handleVideoTime={handleProgress}
               toggleFullscreen={toggleFullscreen}
            ></VideoControls>
         )}

         <video
            ref={videoRef}
            poster={poster}
            src={src}
            className={`object-contain rounded-xl`}
            controlsList={controlsList}
         />
      </div>
   );
}

export default VideoPlayer;
