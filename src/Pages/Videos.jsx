import Search from "../Component/Search";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useAllVideos } from "../Hooks/videoHooks/useGetAllVideos";

function Videos() {
   const { allVideos, loadingVideos } = useAllVideos();
   return (
      <>
         <Search />
         <div className="w-[90vw] grid grid-cols-[auto_auto_auto] justify-start">
            {loadingVideos && <Loader />}
            {allVideos?.pages[0]?.data?.data?.data?.map((v) => (
               <VideoItems v={v} key={v?._id} />
            ))}
         </div>
      </>
   );
}

export default Videos;
