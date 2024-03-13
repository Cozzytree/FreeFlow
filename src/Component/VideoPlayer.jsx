import { useEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";
import { useGlobalContext } from "../Hooks/context/globalContext";

function VideoPlayer({ src, poster, controlsList, videoId, ct, progress }) {
   const videoRef = useRef(null);
   const [loadedPercentage, setLoadedPercentage] = useState(0);
   const [controlsVisible, setControlsVisible] = useState(false);
   const [videoTime, setVideoTime] = useState(
      videoRef?.current?.currentTime || 0
   );
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
         onClick={(e) => toggleControlsTouch(e)}
         onMouseEnter={(e) => toggleControlsMouse(e)}
         onMouseLeave={() => setControlsVisible(false)}
         className={`relative flex justify-center w-auto max-h-[350px] rounded-xl shadow-zinc-700/50 shadow-lg`}
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
            className={`videoPlayer object-contain rounded-xl`}
            controlsList={controlsList}
         />
      </div>
   );
}

export default VideoPlayer;
