import Like from "./Like";
import { time } from "../utils/time";
import VideoOptions from "./ItemOptions";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useLikeTweet } from "../Hooks/likeHooks/useTweetLike";
import { MdMessage } from "react-icons/md";
import { useNavigate } from "react-router";
import { useLazyImage } from "../Hooks/uiHooks/useLazyImage";

function Items({
   tweet,
   showCommentNo = true,
   isInfo = false,
   index,
   handleOptions,
   isOptions,
   setOption,
   options,
}) {
   const navigate = useNavigate();
   const { toggleTweet, loadingTweetlike } = useLikeTweet();
   useLazyImage(".tweets", "data-src", tweet, "src");

   function handleTweetLike(tweetId) {
      toggleTweet(tweetId);
   }

   return (
      <div className={`space-y-5 py-5 flex flex-col items-center`}>
         {tweet && (
            <article className="grid grid-cols-[auto_1fr_auto] w-[80%] h-fit border-[1px] border-zinc-600/50 md:w-[80%] items-start gap-2 p-3 bg-zinc-700/30 rounded-md relative">
               {tweet?.ownerInfo && (
                  <img
                     className="w-[45px] h-[45px] border-[1px] border-zinc-400/50 transition-all duration-200  object-cover rounded-[100%] tweets"
                     data-src={tweet?.ownerInfo?.avatar}
                     src=""
                     alt="avatar"
                  />
               )}
               <section className="flex flex-col gap-3 p-1 w-full">
                  <div className="flex flex-col gap-1 h-fit">
                     <span className="flex items-end gap-2">
                        {tweet?.ownerInfo && (
                           <h2
                              onClick={() =>
                                 navigate(`/u/${tweet?.ownerInfo?._id}/videos`)
                              }
                              className="text-sm md:text-[1.3em] text-sky-500 cursor-pointer"
                           >
                              {tweet?.ownerInfo?.username}
                           </h2>
                        )}

                        <p className="text-[0.65em] md:text-[0.85em]">
                           {tweet?.createdAt && time(tweet?.createdAt)}
                        </p>
                     </span>
                     <p className="text-sm md:text-[1.1em]">{tweet?.content}</p>
                  </div>

                  <div className="grid grid-rows-[auto_1fr] gap-4">
                     <div className="flex items-center gap-4">
                        <Like
                           liked={tweet?.isLiked}
                           loader={loadingTweetlike}
                           handler={() => {
                              handleTweetLike(tweet?._id);
                           }}
                           totalLikes={tweet?.totalLikesCount}
                        />
                        <p className="flex items-center gap-1">
                           {showCommentNo && (
                              <>
                                 <MdMessage
                                    cursor="pointer"
                                    onClick={() => {
                                       if (!isInfo)
                                          navigate(`/post/${tweet?._id}`);
                                    }}
                                 />
                                 <span className="text-sm">
                                    {tweet?.totalCommentsCount}
                                 </span>
                              </>
                           )}
                        </p>
                     </div>
                  </div>
               </section>
               <HiOutlineDotsVertical
                  cursor="pointer"
                  onClick={() => {
                     handleOptions(index);
                  }}
               />
               {index === isOptions && (
                  <VideoOptions setIsOptions={setOption}>
                     {options && options}
                  </VideoOptions>
               )}
            </article>
         )}
      </div>
   );
}

export default Items;
