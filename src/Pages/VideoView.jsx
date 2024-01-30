import VideoPlayer, { useVideo } from "../Component/VideoPlayer";
import Loader from "../Component/loader";
import { useGetaVideo } from "../Hooks/videoHooks/useGetaVideo";
import { time } from "../utils/time";
// import { formatTime } from "../utils/time";

function VideoView() {
   const { video, loadingVideo } = useGetaVideo();
   const { setVideoUrl } = useVideo();

   return (
      <div className="flex flex-col md:flex-row gap-5 animate-slow">
         {loadingVideo && <Loader />}
         <div>
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
               <span className="text-xs">{time(video?.data?.createdAt)}</span>
            </p>
            <p>Comments</p>
         </div>
         <p className="">recommendations</p>
      </div>
   );
}

export default VideoView;
