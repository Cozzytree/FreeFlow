import { useState } from "react";
import { useGetVideoComments } from "../Hooks/commentHooks/getVideoComments";

function Comments({ totalComments }) {
   const { videoComments, isLoading } = useGetVideoComments();
   const [isComments, setComments] = useState(false);

   return (
      <div className="overflow-y-auto max-h-[150px] space-x-3 overflow-hidden">
         {!isComments && (
            <button onClick={() => setComments(true)}>&darr; comments</button>
         )}
         {totalComments && <span>{totalComments}</span>}
         <div
            className={`${
               isComments ? "translate-y-[0px]" : "translate-y-[-500px]"
            } origin-top transition-all duration-200 space-y-2`}
         >
            {videoComments?.pages[0]?.data?.data?.map((comment) => (
               <div
                  key={comment._id}
                  className="grid grid-cols-[auto_1fr] gap-4"
               >
                  <img
                     src={comment?.user?.avatar}
                     alt="image"
                     className="w-[30px] h-[30px] rounded-[100%]"
                  />
                  <div>
                     <h2>{comment?.user?.username}</h2>
                     <p className="text-zinc-400 text-sm">{comment?.content}</p>
                  </div>
               </div>
            ))}

            <button onClick={() => setComments(false)}>&uarr; collapse</button>
         </div>
      </div>
   );
}

export default Comments;
