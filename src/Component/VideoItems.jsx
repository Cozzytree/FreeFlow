import { useState } from "react";
import { useNavigate } from "react-router";
import Options from "./Options";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import Loader from "./loader";
import { useUpdateVideo } from "../Hooks/videoHooks/useUpdateVideo";
import { useUpdateThumbnail } from "../Hooks/videoHooks/useUpdateThumbnail";

function VideoItems({ v }) {
   const [isVideo, setVideo] = useState(false);
   const { userDeleteVideo, isDeleting } = useDeleteVideos();
   const { isUpdating, userUpdateVideo } = useUpdateVideo();
   const { userUpdateThumbnail, isUpdating: updatingThumbnail } =
      useUpdateThumbnail();
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
   function handleUpdateVideo(e, videoId, info) {
      e.preventDefault();
      userUpdateVideo({ videoId, info });
   }

   function handleUpdateThumbnail(videoId, image) {
      const formData = new FormData();
      formData.append("thumbnail", image);
      console.log(videoId, image);
      userUpdateThumbnail({ videoId, formData });
   }

   return (
      <div className="flex flex-col p-5 gap-2 items-start relative">
         {isDeleting && <Loader />}
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

         <div className="relative">
            <video
               onClick={() => {
                  navigate(`/v/${v?._id}`);
               }}
               poster={v?.thumbnail}
               controlsList="nodownload nofullscreen nodocumentfile"
               className="w-[300px] h-[200px] object-scale-down rounded-md animate-slow cursor-pointer"
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
