import Items from "../Component/Items";
import Loader from "../Component/loader";
import TweetComments from "../Component/tweetComments";
import VideoOptionsItem from "../Component/VideoOptionsItem";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { useGetAtweet } from "../Hooks/tweetsHooks/useGetAtweet";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import FormInput from "../Component/FormInput";
import { useForm } from "react-hook-form";
import Button from "../Component/Button";
import MiniSpinner from "../Component/MiniSpinner";
import ModalProvider from "../Component/Modal";
import { useEditTweet } from "../Hooks/tweetsHooks/useEditTweet";
import AreYouSure from "../Component/AreYouSure";
import { useDeleteTweet } from "../Hooks/tweetsHooks/useDeleteTweet";
import { useNavigate } from "react-router";

function TweetInDetail() {
   const { currentUser } = useCurrentUser();
   const { userEditTweet, isEditing } = useEditTweet();
   const { userDeleteTweet, deletingTweet } = useDeleteTweet();
   const { loadingTweet, atweet } = useGetAtweet();
   const { register, handleSubmit } = useForm();
   const [option, setOption] = useState(null);
   const navigate = useNavigate();

   const handleOption = () => {
      setOption((option) => (option === 0 ? null : 0));
   };

   const tweetUpdate = (data) => {
      userEditTweet(
         { tweetId: atweet?.data?._id, content: data },
         {
            onSuccess: () => {
               setOption(null);
            },
         }
      );
   };

   const handleDeleteTweet = () => {
      userDeleteTweet(atweet?.data?._id, {
         onSuccess: () => {
            setOption(null);
            navigate("/");
         },
      });
   };

   return (
      <>
         {loadingTweet && <Loader />}
         <Items
            tweet={atweet?.data}
            showCommentNo={false}
            isInfo={true}
            index={0}
            handleOptions={handleOption}
            isOptions={option}
            setOption={setOption}
            options={
               <>
                  {currentUser?.data?._id === atweet?.data?.ownerInfo?._id && (
                     <>
                        <ModalProvider>
                           <ModalProvider.ModalOpen opens="formEdit">
                              <VideoOptionsItem
                                 label="Edit"
                                 icon={
                                    <MdEdit
                                       size={15}
                                       className="w-full absolute bottom-2 opacity-0"
                                    />
                                 }
                              />
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow window="formEdit">
                              <form
                                 onSubmit={handleSubmit(tweetUpdate)}
                                 className="flex flex-col items-center gap-3"
                              >
                                 <FormInput
                                    id="content"
                                    type="text"
                                    register={register}
                                    placeholder=""
                                    defaultValue={atweet?.data?.content}
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
                           <ModalProvider.ModalOpen opens="tweetDel">
                              <VideoOptionsItem
                                 label="Delete"
                                 icon={
                                    <MdDelete
                                       fill="red"
                                       size={15}
                                       className="w-[100%] absolute bottom-2 opacity-0"
                                    />
                                 }
                              />
                           </ModalProvider.ModalOpen>
                           <ModalProvider.ModalWindow window="tweetDel">
                              <AreYouSure
                                 label="Are you sure you want to delete this post?"
                                 confirm="Yes"
                                 loader={deletingTweet}
                                 hadler={handleDeleteTweet}
                              />
                           </ModalProvider.ModalWindow>
                        </ModalProvider>
                     </>
                  )}

                  <VideoOptionsItem label="Share" />
                  <VideoOptionsItem label="Report" />
               </>
            }
         />
         {currentUser?.data?._id && (
            <TweetComments tweetId={atweet?.data?._id} />
         )}
      </>
   );
}

export default TweetInDetail;
