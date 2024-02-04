import { createContext, useContext, useState } from "react";
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
   return (
      <div className="bg-zinc-900 p-2" style={{ background: poster }}>
         <video
            poster={poster}
            src={src}
            className="videoPlayer relative w-[800px] h-[250px] md:h-[350px]"
            controls
            controlsList={controlsList}
         >
            <MdOutlineRectangle />
         </video>
      </div>
   );
}

export default VideoPlayer;
