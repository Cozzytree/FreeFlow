import Comments from "../Component/Comments";
import VideoPlayer, { useVideo } from "../Component/VideoPlayer";
import Loader from "../Component/loader";
import { useGetaVideo } from "../Hooks/videoHooks/useGetaVideo";
import { time } from "../utils/time";

function VideoView() {
   const { video, loadingVideo } = useGetaVideo();
   const { setVideoUrl } = useVideo();

   // // Assuming you have a way to measure the user's progress
   // const videoElement = document.getElementById("your-video-element");
   // let isViewCounted = false;

   // // Add an event listener for the 'timeupdate' event to track video progress
   // videoElement.addEventListener("timeupdate", () => {
   //    const videoDuration = videoElement.duration;
   //    const watchedPercentage =
   //       (videoElement.currentTime / videoDuration) * 100;

   //    // Check if the user has watched at least 10% and if the view hasn't been counted yet
   //    if (watchedPercentage >= 10 && !isViewCounted) {
   //       // Send a request to your server to increment the view count
   //       // Example: You might use fetch or another method to send a request to your server
   //       // incrementViewCount(videoId);

   //       // Mark the view as counted to prevent multiple increments
   //       isViewCounted = true;
   //    }
   // });
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
            <Comments totalComments={video?.data?.totalComments} />
         </div>
         <p className="">recommendations</p>
      </div>
   );
}

export default VideoView;
