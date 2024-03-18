import { useNavigate } from "react-router";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useGetWatchHistory } from "../Hooks/authHooks/useGetWatchHistory";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import Button from "../Component/Button";
import { useClearWHistory } from "../Hooks/authHooks/useClearHistory";
import { useState } from "react";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import { MdPlaylistAdd } from "react-icons/md";
import ModalProvider from "../Component/Modal";
import PlaylistItem from "../Component/PlaylistItem";
import Header from "../Component/Header";

function WatchHistory() {
   const navigate = useNavigate();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   const [isOptions, setOptions] = useState(null);
   const { cWatchHistory, isClearing } = useClearWHistory();
   useDocumentTitle("Watch History");
   if (!currentUser && !loadingCurrentUser) {
      navigate("/login");
   }
   const { userWatchHistory, loadingHistory } = useGetWatchHistory();
   const handleOption = (index) => {
      setOptions((option) => (option === index ? null : index));
   };

   return (
      <>
         <Header> Watch History</Header>

         {userWatchHistory?.data?.length >= 1 && (
            <Button
               onClick={cWatchHistory}
               disabled={isClearing}
               extrastyles="absolute top-15 right-5 text-xs"
               type="danger"
            >
               Clear History
            </Button>
         )}

         <div className="w-[90vw] grid grid-cols-[1fr_1fr] gap-3 md:grid-cols-[1fr_1fr_1fr] justify-center">
            {loadingHistory && <Loader />}

            {userWatchHistory?.data?.map((v, i) => (
               <VideoItems
                  v={v.watch_history}
                  key={i}
                  index={i}
                  isOptions={isOptions}
                  handleOption={handleOption}
                  setIsOptions={setOptions}
                  options={
                     <>
                        <ModalProvider>
                           <ModalProvider.ModalOpen opens="wh">
                              <VideoOptionsItem
                                 label="add to playlist"
                                 icon={<MdPlaylistAdd size={15} />}
                              />
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow window="wh">
                              <PlaylistItem videoId={v?._id} />
                           </ModalProvider.ModalWindow>
                        </ModalProvider>
                     </>
                  }
               />
            ))}
         </div>
      </>
   );
}

export default WatchHistory;
