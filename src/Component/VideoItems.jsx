import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Options from "./Options";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import Loader from "./loader";
import { useUpdateVideo } from "../Hooks/videoHooks/useUpdateVideo";
import { useUpdateThumbnail } from "../Hooks/videoHooks/useUpdateThumbnail";
import { useLazyImage } from "../Hooks/uiHooks/useLazyImage";

function VideoItems({ v, options = true, children, index }) {
   const [isVideo, setVideo] = useState(false);
   const { userDeleteVideo, isDeleting } = useDeleteVideos();
   const { isUpdating, userUpdateVideo } = useUpdateVideo();
   const { userUpdateThumbnail, isUpdating: updatingThumbnail } =
      useUpdateThumbnail();
   const navigate = useNavigate();
   const videoRef = useRef([]);

   useLazyImage(".videos", "data-src", v, "poster");

   function handlePlayV() {
      setVideo(true);
   }
   function handleStopv() {
      setVideo(false);
   }
   function handleDeleteVideo(videoId) {
      userDeleteVideo(videoId);
   }
   function handleUpdateVideo(videoId, info) {
      userUpdateVideo({ videoId, info });
   }

   function handleUpdateThumbnail(videoId, image) {
      const formData = new FormData();
      formData.append("thumbnail", image);
      console.log(videoId, image);
      userUpdateThumbnail({ videoId, formData });
   }

   return (
      <div
         ref={(video) => (videoRef.current[+index] = video)}
         className={`transition-all duration-300 flex flex-col p-5 gap-2 items-start relative bg-zinc-900/20`}
      >
         {isDeleting && <Loader />}
         {children && children}
         {options && (
            <Options
               type="video"
               userId={v?.owner}
               deleteHandler={handleDeleteVideo}
               currentItem={v?._id}
               videoEdit={{
                  handler: handleUpdateVideo,
                  upThumbnail: handleUpdateThumbnail,
                  updatingThumbnail,
                  loader: isUpdating,
                  videoId: v?._id,
                  title: v?.title,
                  published: v?.isPublished,
                  description: v?.description,
               }}
            />
         )}

         <div className="relative">
            <video
               onClick={() => {
                  navigate(`/v/${v?._id}`);
               }}
               data-src={v?.thumbnail}
               poster=""
               controlsList="nodownload nofullscreen nodocumentfile"
               className={`videos transition-all duration-200 w-[300px] h-[200px] object-scale-down rounded-md animate-slow cursor-pointer`}
               onMouseLeave={handleStopv}
               onMouseEnter={handlePlayV}
               src={isVideo ? v?.videoFile : ""}
               autoPlay
               muted
            ></video>
            <span className="text-sm absolute bottom-1 right-2">
               {(v?.duration / 60).toFixed(2)}
            </span>
         </div>
         <div
            className="flex gap-3"
            onClick={() => navigate(`/u/${v?.user?.id}/videos`)}
         >
            {v?.user?.avatar && (
               <img
                  src={v?.user?.avatar}
                  alt="user img"
                  className="w-[30px] h-[30px] aspect-square rounded-[100%] gap-3"
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
            <span className="text-sm text-zinc-400"> {v?.views} views</span>
         </div>
      </div>
   );
}

export default VideoItems;
