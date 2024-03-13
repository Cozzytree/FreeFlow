import CommentForm from "./CommentForm";
import MiniSpinner from "./MiniSpinner";
import VideoOptions from "./ItemOptions";
import VideoOptionsItem from "./VideoOptionsItem";
import ModalProvider from "./Modal";
import AreYouSure from "./AreYouSure";
import { useGetTweetComments } from "../Hooks/commentHooks/getTweetComments";
import { useAddTweetComment } from "../Hooks/commentHooks/useaddTweetComment";
import { time } from "../utils/time";
import { useDeleteTweetComment } from "../Hooks/commentHooks/useDeleteCommentTweet";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";

function TweetComments({ tweetId }) {
   const { currentUser } = useCurrentUser();
   const [isOptions, setOption] = useState(null);
   const { isLoading, tweetComments } = useGetTweetComments(tweetId);
   const { addTcomment, commentingTweet } = useAddTweetComment();
   const { isPending, deleteComment } = useDeleteTweetComment();

   const handleOption = (index) => {
      setOption((option) => (option === index ? null : index));
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
                     <h2 className="text-[2px] md:text-[1em] flex flex-col">
                        {comment?.user?.username}
                        <span className="text-xs tracking-tighter px-3 text-zinc-400">
                           {time(comment?.createdAt)}
                        </span>
                     </h2>
                     <p className="text-zinc-300 text-sm">{comment?.content}</p>
                  </div>

                  {currentUser?.data?._id === comment?.user?._id && (
                     <>
                        <HiOutlineDotsVertical
                           cursor="pointer"
                           onClick={() => handleOption(index)}
                        />
                        {index === isOptions && (
                           <VideoOptions setIsOptions={setOption}>
                              <VideoOptionsItem label="Edit" />

                              <ModalProvider>
                                 <ModalProvider.ModalOpen opens="delComment">
                                    <VideoOptionsItem label="Delete" />
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
