import VideoOptionsItem from "../Component/VideoOptionsItem";
import VideoEditForm from "../Component/VideoEditForm";
import ModalProvider from "../Component/Modal";
import AreYouSure from "../Component/AreYouSure";
import VideoItems from "../Component/VideoItems";
import MiniSpinner from "../Component/MiniSpinner";
import { FaTrash, FaShare } from "react-icons/fa";
import { useUserVideo } from "../Hooks/videoHooks/useUserVideo";
import { useUpdateThumbnail } from "../Hooks/videoHooks/useUpdateThumbnail";
import { useUpdateVideo } from "../Hooks/videoHooks/useUpdateVideo";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import { useState } from "react";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

function UserVideos() {
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const [option, setOption] = useState(null);
   const { userVideos, loadingVideos } = useUserVideo();
   const { userUpdateThumbnail, isUpdating: updatingThumbnail } =
      useUpdateThumbnail();
   const { userUpdateVideo, isUpdating } = useUpdateVideo();
   const { userDeleteVideo, isDeleting } = useDeleteVideos();

   const { data } = userVideos || [];

   const handleOprions = (index) => {
      setOption((option) => (option === index ? null : index));
   };

   function handleUpdateThumbnail(videoId, image) {
      const formData = new FormData();
      formData.append("thumbnail", image);
      userUpdateThumbnail({ videoId, formData });
   }

   function handleUpdateVideo(videoId, info) {
      userUpdateVideo({ videoId, info });
   }

   function handleDeleteVideo(videoId) {
      userDeleteVideo(videoId);
   }

   return (
      <>
         <div
            className={`w-[90vw] grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] just gap-1 pt-4`}
         >
            {(loadingVideos || loadingCurrentUser) && <MiniSpinner />}
            {data?.length === 0 ? (
               <span className="text-sm text-zinc-400">no videos!</span>
            ) : (
               <>
                  {data?.map((v, index) => (
                     <VideoItems
                        v={v}
                        key={index}
                        index={index}
                        isOptions={option}
                        setIsOptions={setOption}
                        handleOption={handleOprions}
                        options={
                           <>
                              {cu?.data?._id === v?.owner && (
                                 <>
                                    <ModalProvider>
                                       <ModalProvider.ModalOpen>
                                          <VideoOptionsItem
                                             label="Delete"
                                             icon={
                                                <FaTrash
                                                   className="w-full"
                                                   fill="red"
                                                />
                                             }
                                          />
                                       </ModalProvider.ModalOpen>
                                       <ModalProvider.ModalWindow>
                                          <AreYouSure
                                             label="Are you sure you want to delete this video?"
                                             hadler={() =>
                                                handleDeleteVideo(v?._id)
                                             }
                                             confirm="Delete"
                                             loader={isDeleting}
                                          />
                                       </ModalProvider.ModalWindow>
                                    </ModalProvider>

                                    <VideoEditForm
                                       video={v}
                                       handleUpdateThumbnail={
                                          handleUpdateThumbnail
                                       }
                                       updatingThumbnail={updatingThumbnail}
                                       handleUpdateVideo={handleUpdateVideo}
                                       updatingVideo={isUpdating}
                                    />
                                 </>
                              )}

                              <VideoOptionsItem
                                 label="Share"
                                 icon={<FaShare className="w-full" />}
                              />
                           </>
                        }
                     />
                  ))}
               </>
            )}
         </div>
      </>
   );
}

export default UserVideos;
