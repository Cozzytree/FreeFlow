import VideoRow from "../Component/VideoRow";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import PlaylistItem from "../Component/PlaylistItem";
import ModalProvider from "../Component/Modal";
import Header from "../Component/Header";
import SelectTag from "../Component/SelectTag";
import OptionsTag from "../Component/OptionsTag";
import { useEffect, useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import { useSearchVideo } from "../Hooks/videoHooks/useSearchVideo";
import { useSearchParams } from "react-router-dom";
import { filters } from "../utils/consts";

function SearchResults() {
   const [params] = useSearchParams();
   const { searchResults, refetch } = useSearchVideo(params);
   const [isOptions, setOptions] = useState(null);

   useEffect(() => {
      refetch();
   }, [params, refetch]);

   const handleOptions = (index) => {
      setOptions((option) => (option === index ? null : index));
   };

   return (
      <div className="w-full flex flex-col items-center gap-1 relative pt-8">
         <ModalProvider>
            <ModalProvider.ModalOpen opens="search">
               <div className="flex items-center gap-3 absolute right-5 top-0 cursor-pointer">
                  <span>Filters</span> <LuSettings2 />
               </div>
            </ModalProvider.ModalOpen>
            <ModalProvider.ModalWindow window="search">
               <div className="text-zinc-100 min-h-[200px]">
                  <Header>Search Filters</Header>
                  <div className="grid grid-rows-[1fr_1fr_1fr_1fr]">
                     <SelectTag label="Upload Date">
                        {filters?.UploadDate.map((time) => (
                           <OptionsTag key={time} value={time} />
                        ))}
                     </SelectTag>

                     <SelectTag label="Duration">
                        {filters?.duration.map((duration) => (
                           <OptionsTag key={duration} value={duration} />
                        ))}
                     </SelectTag>

                     <SelectTag label="sortBy">
                        {filters?.sortBy.map((sort) => (
                           <OptionsTag key={sort} value={sort} />
                        ))}
                     </SelectTag>

                     <SelectTag label="Type">
                        {filters?.type.map((type) => (
                           <OptionsTag key={type} value={type} />
                        ))}
                     </SelectTag>
                  </div>
               </div>
            </ModalProvider.ModalWindow>
         </ModalProvider>

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
