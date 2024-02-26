import VideoItems from "../Component/VideoItems";
import { useAllVideos } from "../Hooks/videoHooks/useGetAllVideos";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";

function Videos() {
   const { allVideos, loadingVideos } = useAllVideos();
   useDocumentTitle("Videos");

   return (
      <>
         <div className="w-[90vw] grid grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] justify-center gap-1">
            {allVideos?.pages[0]?.data?.data?.data?.map((v, i) => (
               <VideoItems v={v} key={v?._id} index={i} />
            ))}
         </div>
      </>
   );
}

export default Videos;
