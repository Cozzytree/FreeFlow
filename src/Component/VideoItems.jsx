import { useState } from "react";
import { useNavigate } from "react-router";
import Options from "./Options";

function VideoItems({ v, type }) {
     const [isVideo, setVideo] = useState(false);
     const navigate = useNavigate();
     function handlePlayV() {
          setVideo(true);
     }
     function handleStopv() {
          setVideo(false);
     }
     return (
          <div className="flex flex-col p-5 gap-2 items-start relative">
               {type === "user" && <Options userId={v?.owner} />}
               <video
                    onClick={() => {
                         navigate(`/v/${v?._id}`);
                    }}
                    poster={v?.thumbnail}
                    controlsList="nodownload nofullscreen nodocumentfile"
                    className="w-[250px] h-[150px] object-cover rounded-md animate-slow cursor-pointer"
                    onMouseLeave={handleStopv}
                    onMouseEnter={handlePlayV}
                    src={isVideo ? v?.videoFile : ""}
                    autoPlay
                    muted
               ></video>

               <div className="flex gap-3">
                    {v?.user?.avatar && (
                         <img
                              src={v?.user?.avatar}
                              alt="user img"
                              className="w-[30px] h-[30px] rounded-[100%] gap-3"
                         />
                    )}

                    <div>
                         <p className="text-zinc-400 text-sm">{v?.title}</p>

                         {v?.user?.username && (
                              <h2 className="text-sm text-zinc-200 cursor-pointer">
                                   {v?.user?.username}
                              </h2>
                         )}
                    </div>
               </div>
          </div>
     );
}

export default VideoItems;
