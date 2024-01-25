import VideoPlayer, { useVideo } from "../Component/VideoPlayer";
import { useGetaVideo } from "../Hooks/videoHooks/useGetaVideo";

function VideoView() {
     const { video, loadingVideo } = useGetaVideo();
     const { setVideoUrl } = useVideo();

     console.log(video);
     return (
          <div onClick={() => setVideoUrl(video?.data?.videoFile)}>
               <VideoPlayer src={video?.data?.videoFile} />
          </div>
     );
}

export default VideoView;
