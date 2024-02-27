import { useState } from "react";
import { useGetVideoComments } from "../Hooks/commentHooks/getVideoComments";
import MiniSpinner from "./MiniSpinner";
import { time } from "../utils/time";
import { useAddVideoComment } from "../Hooks/commentHooks/useAddComment";
import { useParams } from "react-router";
import Options from "./Options";
import { useDeleteVideoComment } from "../Hooks/commentHooks/useDeleteVideoComment";
import CommentForm from "./CommentForm";

function Comments() {
   const { videoComments, isLoading } = useGetVideoComments();
   const { addComment, isComenting } = useAddVideoComment();
   const { deleteComment, isDeleting } = useDeleteVideoComment();
   const [content, setContent] = useState("");
   const params = useParams();

   function handleaddComment(e, videoId, content) {
      e.preventDefault();
      if (content.length === 0) return;
      addComment({ videoId, content });
      setContent("");
   }

   function handleDeleteComment(tweetId) {
      deleteComment(tweetId);
   }

   return (
      <div className="overflow-y-auto max-h-[200px] px-2 overflow-hidden">
         {isLoading && <MiniSpinner />}

         <div
            className={`transition-all duration-200 space-y-2 flex flex-col items-center`}
         >
            {/* {form for commrnt} */}

            <CommentForm
               handler={(e) =>
                  handleaddComment(e, params?.videoId, { content })
               }
               setContent={setContent}
               isLoading={isComenting}
            />

            {/* {comments} */}
            {(isComenting || isDeleting) && <MiniSpinner />}
            {videoComments?.pages[0]?.data?.data?.map((comment) => (
               <div
                  key={comment._id}
                  className="grid grid-cols-[auto_1fr] gap-5 pb-5 w-[100%] relative p-3"
               >
                  <Options
                     Isshare={false}
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
                     <h2 className="text-sm md:text-[1.2em]">
                        {comment?.user?.username}
                        <span className="text-sm px-3 text-zinc-300">
                           {time(comment?.createdAt)}
                        </span>
                     </h2>
                     <p className="text-zinc-300 text-sm md:text-[1em]">
                        {comment?.content}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Comments;
