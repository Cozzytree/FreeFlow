import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useAllVideos } from "../Hooks/videoHooks/useGetAllVideos";

function Videos() {
   const { allVideos, loadingVideos } = useAllVideos();

   return (
      <>
         {loadingVideos ? (
            <Loader />
         ) : (
            <div className="w-[90vw] grid grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] justify-start gap-1">
               {allVideos?.pages[0]?.data?.data?.data?.map((v, i) => (
                  <VideoItems v={v} key={v?._id} index={i} />
               ))}
            </div>
         )}
      </>
   );
}

export default Videos;
