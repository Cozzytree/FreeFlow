import VideoComments from "../Component/VideoComments";
import VideoPlayer from "../Component/VideoPlayer";
import Loader from "../Component/loader";
import Like from "../Component/Like";
import VideoItems from "../Component/VideoItems";
import MiniSpinner from "../Component/MiniSpinner";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import ModalProvider from "../Component/Modal";
import PlaylistItem from "../Component/PlaylistItem";
import { useEffect } from "react";
import { useGetaVideo } from "../Hooks/videoHooks/useGetaVideo";
import { time } from "../utils/time";
import { useAddView } from "../Hooks/videoHooks/useAddView";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUpdateWatchHistory } from "../Hooks/authHooks/useUpdateWatchHistory";
import { useVideoLike } from "../Hooks/likeHooks/useVideoLike";
import { useRecommend } from "../Hooks/videoHooks/useRecommend";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { AiOutlineShareAlt, AiOutlineVideoCameraAdd } from "react-icons/ai";

function VideoView() {
   const [extra, setExtra] = useState(false);
   const [isComments, setComments] = useState(false);
   const [isOptions, setIsOptions] = useState(null);
   const navigate = useNavigate();
   const params = useParams();
   const { currentUser } = useCurrentUser();
   const { video, loadingVideo, refetchGetAvideo } = useGetaVideo();
   const { addToWatchHistory } = useUpdateWatchHistory();
   const { isLiking, likeVideo } = useVideoLike();
   const { recommendV, isLoading } = useRecommend();
   const { videoAddView } = useAddView();

   useEffect(() => {
      refetchGetAvideo();
   }, [params?.videoId, refetchGetAvideo, navigate]);

   function handleOption(index) {
      setIsOptions((option) => (index === option ? null : index));
   }

   function handleVideoLike(videoId) {
      likeVideo(videoId);
   }

   return (
      <div className="flex flex-col md:grid md:grid-cols-[1fr_0.5fr] gap-5 animate-slow">
         {loadingVideo && <Loader />}
         <div className="space-y-2">
            <div className="rounded-md">
               <VideoPlayer
                  recommend={recommendV ? recommendV[0] : null}
                  addViewHandler={videoAddView}
                  addWatchHandler={addToWatchHistory}
                  params={params}
                  // progress={progress}
                  videoId={video?.data?._id}
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
                     {video?.data?.createdAt && time(video?.data?.createdAt)}
                  </span>
               )}

               {/* {extras info toggle} */}
               <span
                  onClick={() => setExtra((extras) => !extras)}
                  className="cursor-pointer"
               >
                  more &darr;
               </span>
            </p>
            <Like
               totalLikes={video?.data?.totalLikes}
               liked={video?.data?.isLiked}
               loader={isLiking}
               handler={() => {
                  handleVideoLike(params?.videoId);
               }}
            />

            {/* {extras information} */}
            {extra && (
               <div className="bg-zinc-900/30 p-2 min-h-[100px] rounded-md text-sm md:text-[1em] font-[500] tracking-wide">
                  {video?.data?.description
                     ? video?.data?.description
                     : "no additional info!"}
               </div>
            )}

            {/* {commenst toggle} */}
            <button onClick={() => setComments((comment) => !comment)}>
               comments &darr; {video?.data?.totalComments}
            </button>

            {isComments && (
               <VideoComments totalComments={video?.data?.totalComments} />
            )}
         </div>

         <div className="flex flex-col items-center justify-start gap-1">
            Queue
            {isLoading && <MiniSpinner />}
            {recommendV &&
               recommendV[0]?.data?.videos.map((v, index) => (
                  <VideoItems
                     v={v}
                     key={v?._id}
                     index={index}
                     isOptions={isOptions}
                     handleOption={handleOption}
                     setIsOptions={setIsOptions}
                     options={
                        <>
                           <VideoOptionsItem
                              label="share"
                              icon={<AiOutlineShareAlt />}
                           />
                           <VideoOptionsItem
                              label="Add to Queue"
                              icon={<AiOutlineVideoCameraAdd size={15} />}
                           />
                           {currentUser?.data?._id && (
                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="playlistItem">
                                    <VideoOptionsItem
                                       label={"add to playlist"}
                                       icon={
                                          <MdOutlinePlaylistAdd scale={20} />
                                       }
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="playlistItem">
                                    <PlaylistItem
                                       videoId={v?._id}
                                       published={v?.isPublished}
                                    />
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>
                           )}
                        </>
                     }
                  />
               ))}
         </div>
      </div>
   );
}

export default VideoView;
