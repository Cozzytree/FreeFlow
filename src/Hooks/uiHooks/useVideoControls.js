import { useEffect } from "react";

export function useVideoControls(element, setProgress) {
   useEffect(() => {
      const videoElement = document.querySelector(element);
      if (videoElement) videoElement.play();
      function handleTimeUpdate() {
         setProgress(videoElement?.currentTime);
      }

      if (videoElement)
         videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
         if (videoElement)
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
   }, [element, setProgress]);
}
