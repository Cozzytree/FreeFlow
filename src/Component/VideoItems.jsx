import { useState } from "react";
import { useNavigate } from "react-router";

function VideoItems({ v }) {
     const [isVideo, setVideo] = useState(false);
     const navigate = useNavigate();
     function handlePlayV() {
          setVideo(true);
     }
     function handleStopv() {
          setVideo(false);
     }
     return (
          <div
               className="w-[200px] flex flex-col gap-1 items-center cursor-pointer"
               onClick={() => {
                    navigate(`/v/${v?._id}`);
               }}
          >
               {isVideo ? (
                    <video
                         className="w-[200px] h-[150px] object-cover animate-slow"
                         onMouseLeave={handleStopv}
                         src={v?.videoFile}
                         autoPlay
                         controls
                         muted
                    ></video>
               ) : (
                    <img
                         onMouseEnter={handlePlayV}
                         src={v.thumbnail}
                         alt=""
                         className="rounded-md w-[200px] h-[150px] object-cover animate-slow"
                    />
               )}

               <p>{v.title}</p>
          </div>
     );
}

export default VideoItems;
