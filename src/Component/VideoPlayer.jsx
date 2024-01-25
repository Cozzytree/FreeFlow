import { createContext, useContext, useState } from "react";
import { MdOutlineRectangle } from "react-icons/md";

const VideoContext = createContext();

function VideoProvider({ children }) {
     const [video, setVideo] = useState("");
     function setVideoUrl(url) {
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

function VideoPlayer({ src }) {
     return (
          <video src={src} className="relative" controls controlsList="">
               <MdOutlineRectangle />
          </video>
     );
}

export default VideoPlayer;
