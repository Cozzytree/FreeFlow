import VideoPlayer from "../Component/VideoPlayer";
import { useGetaVideo } from "../Hooks/videoHooks/useGetaVideo";

function VideoView() {
     const { video, loadingVideo } = useGetaVideo();
     console.log(video);
     return (
          <div>
               <VideoPlayer src={video?.data?.videoFile} />
          </div>
     );
}

export default VideoView;
