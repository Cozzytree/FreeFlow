import { useEffect, useState } from "react";
import { MdPlaylistAdd, MdShare } from "react-icons/md";
import VideoRow from "../Component/VideoRow";
import { useSearchVideo } from "../Hooks/videoHooks/useSearchVideo";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import PlaylistItem from "../Component/PlaylistItem";
import ModalProvider from "../Component/Modal";
import { useParams } from "react-router";

function SearchResults() {
   const params = useParams();
   const { searchResults, refetch } = useSearchVideo();
   const [isOptions, setOptions] = useState(null);

   useEffect(() => {
      refetch();
   }, [params, refetch]);

   const handleOptions = (index) => {
      setOptions((option) => (option === index ? null : index));
   };

   return (
      <div className="w-full flex flex-col items-center gap-1">
         {searchResults?.data?.map((v, index) => (
            <VideoRow
               video={v}
               key={index}
               index={index}
               handleOptions={handleOptions}
               isOptions={isOptions}
               setOption={setOptions}
               options={
                  <>
                     <VideoOptionsItem
                        label="Share"
                        icon={<MdShare className="w-full" size={12} />}
                     />
                     <ModalProvider>
                        <ModalProvider.ModalOpen>
                           <VideoOptionsItem
                              label="Playlist"
                              icon={
                                 <MdPlaylistAdd className="w-full" size={12} />
                              }
                           />
                        </ModalProvider.ModalOpen>
                        <ModalProvider.ModalWindow>
                           <PlaylistItem videoId={v?._id} />
                        </ModalProvider.ModalWindow>
                     </ModalProvider>
                  </>
               }
            />
         ))}
      </div>
   );
}

export default SearchResults;
