import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import PlaylistItem from "../Component/PlaylistItem";
import ModalProvider from "../Component/Modal";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import { MdOutlinePlaylistAdd, MdShare } from "react-icons/md";
import { useAllVideos } from "../Hooks/videoHooks/useGetAllVideos";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { useState } from "react";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

function Videos() {
   const { currentUser } = useCurrentUser();
   const { allVideos, loadingVideos } = useAllVideos();
   const [isOptions, setIsOptions] = useState(null);
   useDocumentTitle("Videos");

   function handleOption(index) {
      setIsOptions((option) => (index === option ? null : index));
   }

   return (
      <>
         {loadingVideos ? (
            <Loader />
         ) : (
            <div className="w-[90vw] grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] just space-y-2 space-x-1">
               {allVideos?.pages[0]?.data?.data?.data?.map((v, i) => (
                  <VideoItems
                     setIsOptions={setIsOptions}
                     v={v}
                     key={v?._id}
                     index={i}
                     isOptions={isOptions}
                     handleOption={handleOption}
                     options={
                        <>
                           {currentUser?.data?._id && (
                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="playlistItem">
                                    <VideoOptionsItem
                                       label={"add to playlist"}
                                       icon={
                                          <MdOutlinePlaylistAdd
                                             className="w-full"
                                             size={15}
                                          />
                                       }
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="playlistItem">
                                    <PlaylistItem videoId={v?._id} />
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>
                           )}
                           <VideoOptionsItem
                              setIsOptions={setIsOptions}
                              label="share"
                              icon={<MdShare className="w-full" size={12} />}
                           />
                        </>
                     }
                  />
               ))}
            </div>
         )}
      </>
   );
}

export default Videos;
