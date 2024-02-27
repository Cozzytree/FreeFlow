import { useState } from "react";
import { useGetTweetComments } from "../Hooks/commentHooks/getTweetComments";
import CommentForm from "./CommentForm";
import MiniSpinner from "./MiniSpinner";
import { useAddTweetComment } from "../Hooks/commentHooks/useaddTweetComment";
import { time } from "../utils/time";
import { useDeleteTweetComment } from "../Hooks/commentHooks/useDeleteCommentTweet";
import Options from "./Options";

function TweetComments({ tweetId }) {
   const { isLoading, tweetComments } = useGetTweetComments(tweetId);
   const { addTcomment, commentingTweet } = useAddTweetComment();
   const { isPending, deleteComment } = useDeleteTweetComment();
   const [content, setContent] = useState("");

   function handleTweetComment(e, tweetId, content) {
      e.preventDefault();
      if (!content.content) return;
      addTcomment({ tweetId, content });
      setContent("");
   }

   function handleDeleteComment(commentId) {
      deleteComment(commentId);
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

            {tweetComments?.pages[0]?.data?.data?.map((comment) => (
               <div
                  key={comment._id}
                  className="grid grid-cols-[auto_1fr] gap-4 pb-2 w-[100%] relative p-3"
               >
                  <Options
                     userId={comment?.user?._id}
                     currentItem={comment?._id}
                     deleteHandler={handleDeleteComment}
                  />
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
               </div>
            ))}
         </div>

         <CommentForm
            setContent={setContent}
            handler={(e) => {
               handleTweetComment(e, tweetId, { content });
            }}
            isLoading={commentingTweet}
         />
      </>
   );
}

export default TweetComments;
