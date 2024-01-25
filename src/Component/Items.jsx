import Like from "./Like";
import { formatTime } from "../utils/time";
import Options from "./Options";
import { useDeleteTweet } from "../Hooks/tweetsHooks/useDeleteTweet";
import { useLikeTweet } from "../Hooks/likeHooks/useTweetLike";

function Items({ videoTumbnail, title, tweet }) {
     const { deletingTweet, userDeleteTweet } = useDeleteTweet();
     const { toggleTweet, tweetLikeData, loadingTweetlike } = useLikeTweet();
     function handleDeleteTweet(tweetId) {
          userDeleteTweet(tweetId);
     }
     console.log(tweet);
     function handleTweetLike(tweetId) {
          toggleTweet(tweetId);
     }

     return (
          <div
               className={`space-y-5 w-[90vw] md:w-[80vw] py-5 flex flex-col items-center ${
                    deletingTweet && "animate-pulse"
               }`}
          >
               {videoTumbnail && (
                    <>
                         <img src={videoTumbnail} alt="" />
                         <p>{title}</p>
                    </>
               )}
               {/* {for tweet} */}
               {tweet && (
                    <article className="grid grid-cols-[auto_1fr] w-[80%] md:w-[60%] min-h-[125px] items-start gap-10 p-3 bg-zinc-700/20 rounded-md relative">
                         <Options
                              userId={tweet?.ownerInfo?._id}
                              deleteHandler={handleDeleteTweet}
                              currentTweet={tweet?._id}
                         />

                         <img
                              className="w-[50px] h-[50px] object-cover rounded-[100%]"
                              src={tweet?.ownerInfo.avatar}
                              alt=""
                         />
                         <section className="grid grid-rows-[1fr_auto] h-[100%] p-1 w-[100%]">
                              <div className="flex flex-col gap-1">
                                   <span className="flex items-end gap-2">
                                        <h2 className="text-sm md:text-[1.3em] text-sky-500 cursor-pointer">
                                             {tweet?.ownerInfo.username}
                                        </h2>
                                        <p className="text-[0.65em] md:text-[0.85em]">
                                             {formatTime(tweet?.createdAt)}
                                        </p>
                                   </span>
                                   <p className="text-sm md:text-[1.1em]">
                                        {tweet?.content}
                                   </p>
                              </div>
                              <Like
                                   liked={tweet?.isLiked}
                                   loader={loadingTweetlike}
                                   handler={() => {
                                        handleTweetLike(tweet?._id);
                                   }}
                                   totalLikes={tweet?.totalLikesCount}
                              />
                         </section>
                    </article>
               )}
          </div>
     );
}

export default Items;
