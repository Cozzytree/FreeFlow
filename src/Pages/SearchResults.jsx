import VideoItems from "../Component/VideoItems";
import { useSearchVideo } from "../Hooks/videoHooks/useSearchVideo";

function SearchResults() {
   const { searchResults } = useSearchVideo();
   return (
      <div className="w-[90vw] grid grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] justify-center gap-1">
         {searchResults?.data?.map((v) => (
            <VideoItems v={v} key={v?._id} />
         ))}
      </div>
   );
}

export default SearchResults;
