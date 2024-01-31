import { useState } from "react";
import { useNavigate } from "react-router";
import Options from "./Options";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import Loader from "./loader";

function VideoItems({ v, type }) {
   const [isVideo, setVideo] = useState(false);
   const { userDeleteVideo, isDeleting } = useDeleteVideos();
   const navigate = useNavigate();

   function handlePlayV() {
      setVideo(true);
   }
   function handleStopv() {
      setVideo(false);
   }

   function handleDeleteVideo(videoId) {
      userDeleteVideo(videoId);
   }

   return (
      <div className="flex flex-col p-5 gap-2 items-start relative">
         {isDeleting && <Loader />}
         {type === "user" && (
            <Options
               userId={v?.owner}
               deleteHandler={handleDeleteVideo}
               currentItem={v?._id}
            />
         )}
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

         <div
            className="flex gap-3"
            onClick={() => navigate(`/u/${v?.user?.id}/videos`)}
         >
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
