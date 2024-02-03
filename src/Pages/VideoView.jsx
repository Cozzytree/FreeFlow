import { useEffect } from "react";
import Comments from "../Component/Comments";
import VideoPlayer, { useVideo } from "../Component/VideoPlayer";
import Loader from "../Component/loader";
import { useGetaVideo } from "../Hooks/videoHooks/useGetaVideo";
import { time } from "../utils/time";
import { useState } from "react";
import { useAddView } from "../Hooks/videoHooks/useAddView";
import { useParams } from "react-router";
import { useUpdateWatchHistory } from "../Hooks/authHooks/useUpdateWatchHistory";
import Like from "../Component/Like";
import { useVideoLike } from "../Hooks/likeHooks/useVideoLike";

function VideoView() {
   const params = useParams();
   const { video, loadingVideo } = useGetaVideo();
   const { addToWatchHistory } = useUpdateWatchHistory();
   const { isLiking, likeVideo } = useVideoLike();
   const { videoAddView } = useAddView();
   const { setVideoUrl } = useVideo();
   const [isView, setIsView] = useState(false);

   useEffect(() => {
      const videoElement = document.querySelector(".videoPlayer");

      const handleTimeUpdate = () => {
         const videoDuration = videoElement.duration;
         const watchedPercentage =
            (videoElement.currentTime / videoDuration) * 100;

         if (watchedPercentage >= 10 && !isView) {
            videoAddView(params?.videoId);
            addToWatchHistory(params?.videoId);
            setIsView(true);
         }
      };

      if (!isView)
         videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
         videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
   }, [isView, setIsView, params, addToWatchHistory, videoAddView]);

   function handleVideoLike(videoId) {
      likeVideo(videoId);
   }
   return (
      <div className="flex flex-col md:grid md:grid-cols-[1fr_0.5fr] gap-5 animate-slow">
         {loadingVideo && <Loader />}
         <div className="space-y-2">
            <div onClick={() => setVideoUrl(video?.data?.videoFile)}>
               <VideoPlayer
                  controlsList="nodownload"
                  src={video?.data?.videoFile}
                  poster={video?.data?.thumbnail}
               />
            </div>
            <h2>{video?.data?.title}</h2>
            <p className="text-zinc-400 flex gap-3 text-sm items-center">
               <span>{video?.data?.views} views</span>
               {video?.data?.createdAt && (
                  <span className="text-xs">
                     {time(video?.data?.createdAt)}
                  </span>
               )}
            </p>

            <Like
               totalLikes={video?.data?.totalLikes}
               liked={video?.data?.isLiked}
               loader={isLiking}
               handler={() => {
                  handleVideoLike(params?.videoId);
               }}
            />

            <Comments totalComments={video?.data?.totalComments} />
         </div>
         <p className="">recommendations</p>
      </div>
   );
}

export default VideoView;
