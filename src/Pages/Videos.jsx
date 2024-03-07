import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import PlaylistItem from "../Component/PlaylistItem";
import ModalProvider from "../Component/Modal";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import { MdOutlinePlaylistAdd } from "react-icons/md";
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
            <div className="w-[90vw] grid grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] justify-center gap-1">
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
                           <VideoOptionsItem label="share" />
                           {currentUser?.data?._id && (
                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="playlistItem">
                                    <VideoOptionsItem
                                       label={"add to playlist"}
                                       icon={
                                          <MdOutlinePlaylistAdd className="w-[100%] absolute opacity-0" />
                                       }
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="playlistItem">
                                    <PlaylistItem videoId={v?._id} />
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>
                           )}
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
