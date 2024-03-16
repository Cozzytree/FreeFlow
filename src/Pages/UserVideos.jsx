import UserView from "../Component/UserView";
import Loader from "../Component/loader";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import VideoEditForm from "../Component/VideoEditForm";
import ModalProvider from "../Component/Modal";
import AreYouSure from "../Component/AreYouSure";
import { FaTrash, FaShare } from "react-icons/fa";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useUserVideo } from "../Hooks/videoHooks/useUserVideo";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useUpdateThumbnail } from "../Hooks/videoHooks/useUpdateThumbnail";
import { useUpdateVideo } from "../Hooks/videoHooks/useUpdateVideo";
import { useDeleteVideos } from "../Hooks/videoHooks/useDeleteVideo";
import VideoItems from "../Component/VideoItems";

function UserVideos() {
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const [option, setOption] = useState(null);
   const { loadingUser, currentUser, refetch } = useGetUser();
   const { userVideos, loadingVideos } = useUserVideo();
   const { userUpdateThumbnail, isUpdating: updatingThumbnail } =
      useUpdateThumbnail();
   const { userUpdateVideo, isUpdating } = useUpdateVideo();
   const { userDeleteVideo, isDeleting } = useDeleteVideos();

   const params = useParams();
   useDocumentTitle(currentUser?.data?.username);
   const { data } = userVideos || [];

   useEffect(() => {
      refetch();
   }, [params?.userId, refetch]);

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
         {(loadingUser || loadingCurrentUser) && <Loader />}
         <UserView
            userId={cu?.data?._id}
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
         />
         <TweetsVideoToggle params={params} />

         <div className={`grid grid-cols-[1fr_1fr_1fr] p-3 gap-4 relative`}>
            {loadingVideos ? (
               "loading..."
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
