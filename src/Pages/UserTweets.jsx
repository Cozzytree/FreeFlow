import Items from "../Component/Items";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import UserView from "../Component/UserView";
import Loader from "../Component/loader";
import FormInput from "../Component/FormInput";
import Button from "../Component/Button";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import ModalProvider from "../Component/Modal";
import MiniSpinner from "../Component/MiniSpinner";
import AreYouSure from "../Component/AreYouSure";
import { useParams } from "react-router";
import { MdEdit, MdDelete } from "react-icons/md";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useGetUserTweets } from "../Hooks/tweetsHooks/useGetUserTweets";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { useState } from "react";
import { useEditTweet } from "../Hooks/tweetsHooks/useEditTweet";
import { useForm } from "react-hook-form";
import { useDeleteTweet } from "../Hooks/tweetsHooks/useDeleteTweet";

function UserTweets() {
   const { register, handleSubmit } = useForm();
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const [option, setOption] = useState(null);
   const params = useParams();
   const { userTweets, loadingUserTweets } = useGetUserTweets();
   const { userEditTweet, isEditing } = useEditTweet();
   const { userDeleteTweet, deletingTweet } = useDeleteTweet();
   const { currentUser } = useGetUser();
   useDocumentTitle(currentUser?.data?.username);

   const handleOption = (index) => {
      setOption((option) => (option === index ? null : index));
   };

   const handleEditTweet = (tweetId, content) => {
      userEditTweet(
         { tweetId: tweetId, content: content },
         {
            onSuccess: () => {
               setOption(null);
            },
         }
      );
   };

   const handleDeleteTweet = (tweetId) => {
      userDeleteTweet(tweetId);
   };

   const onSubmit = (data, tweetId) => {
      handleEditTweet(tweetId, data);
   };

   return (
      <>
         {(loadingUserTweets || loadingCurrentUser) && <Loader />}
         <UserView
            userId={cu?.data?._id}
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
            type="owner"
         />
         <TweetsVideoToggle params={params} />

         {userTweets?.data[0]?.data?.map((twee, index) => (
            <Items
               tweet={twee}
               key={twee?._id}
               index={index}
               handleOptions={handleOption}
               isOptions={option}
               setOption={setOption}
               options={
                  <>
                     {twee?.ownerInfo?._id === currentUser?.data?._id && (
                        <>
                           <ModalProvider>
                              <ModalProvider.ModalOpen>
                                 <VideoOptionsItem
                                    label="Edit"
                                    icon={
                                       <MdEdit className="w-full absolute opacity-0" />
                                    }
                                 />
                              </ModalProvider.ModalOpen>
                              <ModalProvider.ModalWindow>
                                 <form
                                    onSubmit={handleSubmit((data) =>
                                       onSubmit(data, twee?._id)
                                    )}
                                    className="flex flex-col items-center gap-3"
                                 >
                                    <FormInput
                                       id="content"
                                       type="text"
                                       register={register}
                                       placeholder=""
                                       defaultValue={twee?.content}
                                    />
                                    <Button
                                       disabled={isEditing}
                                       extrastyles="rounded-sm h-[30px]"
                                       type="primary"
                                    >
                                       {isEditing ? <MiniSpinner /> : "SAVE"}
                                    </Button>
                                 </form>
                              </ModalProvider.ModalWindow>
                           </ModalProvider>

                           <ModalProvider>
                              <ModalProvider.ModalOpen opens="editTweet">
                                 <VideoOptionsItem
                                    label="Delete"
                                    icon={
                                       <MdDelete className="w-full opacity-0 absolute" />
                                    }
                                 />
                              </ModalProvider.ModalOpen>
                              <ModalProvider.ModalWindow window="editTweet">
                                 <AreYouSure
                                    hadler={() => handleDeleteTweet(twee?._id)}
                                    label="Are you sure you want to delete the post?"
                                    confirm="Confirm"
                                    loader={deletingTweet}
                                 />
                              </ModalProvider.ModalWindow>
                           </ModalProvider>
                        </>
                     )}
                  </>
               }
            />
         ))}
      </>
   );
}

export default UserTweets;
