import CommentForm from "./CommentForm";
import MiniSpinner from "./MiniSpinner";
import VideoOptions from "./ItemOptions";
import VideoOptionsItem from "./VideoOptionsItem";
import ModalProvider from "./Modal";
import AreYouSure from "./AreYouSure";
import Button from "./Button";
import FormInput from "./FormInput";
import { useGetTweetComments } from "../Hooks/commentHooks/getTweetComments";
import { useAddTweetComment } from "../Hooks/commentHooks/useaddTweetComment";
import { time } from "../utils/time";
import { useDeleteTweetComment } from "../Hooks/commentHooks/useDeleteCommentTweet";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { MdDelete, MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useUpdateTweetComment } from "../Hooks/commentHooks/useUpdateTweetComment";

function TweetComments({ tweetId }) {
   const { currentUser } = useCurrentUser();
   const [isEdit, setEdit] = useState(false);
   const [isOptions, setOption] = useState(null);
   const { register, handleSubmit } = useForm();
   const { isLoading, tweetComments } = useGetTweetComments(tweetId);
   const { userUpdateTweetComment, isEditingTweetComentm } =
      useUpdateTweetComment();
   const { addTcomment, commentingTweet } = useAddTweetComment();
   const { isPending, deleteComment } = useDeleteTweetComment();
   const inputRef = useRef(null);

   useEffect(() => {
      if (isEdit && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isEdit]);

   const handleOption = (index) => {
      setOption((option) => (option === index ? null : index));
   };

   const handleEditOpen = () => {
      setEdit((edit) => !edit);
      setOption(null);
   };

   const handleUpdateTweetCommment = (commentId) => {
      return (data) => {
         userUpdateTweetComment(
            { commentId, content: data },
            {
               onSuccess: () => setEdit(false),
            }
         );
      };
   };

   function handleTweetComment(tweetId, content) {
      if (!content.content) return;
      addTcomment({ tweetId, content });
   }

   function handleDeleteComment(commentId) {
      deleteComment(commentId, { onSuccess: () => setOption(null) });
   }

   return (
      <>
         <div
            className={`w-[80%] gap-2 p-1 rounded-lg bg-zinc-800/40 border-[1px] border-zinc-100/10`}
         >
            {(isLoading || isPending) && <MiniSpinner />}

            {tweetComments?.pages[0]?.data?.data?.length === 0 && (
               <p className="p-2 text-xs text-zinc-400">no comments...</p>
            )}

            {tweetComments?.pages[0]?.data?.data?.map((comment, index) => (
               <div
                  key={comment._id}
                  className="grid grid-cols-[auto_1fr_auto] gap-4 pb-2 w-[100%] relative p-3"
               >
                  <img
                     src={comment?.user?.avatar}
                     alt="image"
                     className="w-[30px] h-[30px] rounded-[100%]"
                  />
                  <div className="space-y-2">
                     <h2 className="text-[0.8em] md:text-[1em] flex flex-col font-medium tracking-wide">
                        {comment?.user?.username}
                        <span className="text-xs tracking-tighter px-3 text-zinc-400">
                           {time(comment?.createdAt)}
                        </span>
                     </h2>
                     {isEdit ? (
                        <form
                           onSubmit={handleSubmit(
                              handleUpdateTweetCommment(comment?._id)
                           )}
                           className="grid grid-cols-[1fr_auto] gap-1 items-center"
                        >
                           <FormInput
                              inpurRef={inputRef}
                              type="text"
                              register={register}
                              required={true}
                              defaultValue={comment?.content}
                              id="content"
                           />
                           <Button
                              type="primary"
                              extrastyles="rounded-md text-sm"
                              disabled={isEditingTweetComentm}
                           >
                              Save
                           </Button>
                        </form>
                     ) : (
                        <p className="text-zinc-300 text-sm ">
                           {comment?.content}
                        </p>
                     )}
                  </div>

                  {currentUser?.data?._id === comment?.user?._id && (
                     <>
                        <HiOutlineDotsVertical
                           cursor="pointer"
                           onClick={() => handleOption(index)}
                        />
                        {index === isOptions && (
                           <VideoOptions setIsOptions={setOption}>
                              <VideoOptionsItem
                                 label="Edit"
                                 icon={<MdEdit size={10} />}
                                 onClick={handleEditOpen}
                              />

                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="delComment">
                                    <VideoOptionsItem
                                       label="Delete"
                                       icon={<MdDelete fill="red" size={10} />}
                                    />
                                 </ModalProvider.ModalOpen>
                                 <ModalProvider.ModalWindow window="delComment">
                                    <AreYouSure
                                       hadler={() =>
                                          handleDeleteComment(comment?._id)
                                       }
                                       loader={isPending}
                                       label="Are you sure you want to delete the comment ?"
                                       confirm="DELETE"
                                    />
                                 </ModalProvider.ModalWindow>
                              </ModalProvider>
                           </VideoOptions>
                        )}
                     </>
                  )}
               </div>
            ))}
         </div>

         <CommentForm
            handler={(content) => {
               handleTweetComment(tweetId, content);
            }}
            isLoading={commentingTweet}
         />
      </>
   );
}

export default TweetComments;
