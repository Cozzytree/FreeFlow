import Like from "./Like";
import { time } from "../utils/time";
import Options from "./Options";
import { useDeleteTweet } from "../Hooks/tweetsHooks/useDeleteTweet";
import { useLikeTweet } from "../Hooks/likeHooks/useTweetLike";
import TweetComments from "./tweetComments";
import { useState } from "react";
import { MdMessage } from "react-icons/md";
import { useEditTweet } from "../Hooks/tweetsHooks/useEditTweet";

function Items({ tweet }) {
  const [isComment, setComment] = useState(false);
  const { deletingTweet, userDeleteTweet } = useDeleteTweet();
  const { toggleTweet, loadingTweetlike } = useLikeTweet();
  const { isEditing, userEditTweet } = useEditTweet();
  function handleDeleteTweet(tweetId) {
    userDeleteTweet(tweetId);
  }
  function handleTweetLike(tweetId) {
    toggleTweet(tweetId);
  }

  function handleEditTweet(e, tweetId, content) {
    e.preventDefault();
    userEditTweet({ tweetId, content });
  }

  return (
    <div
      className={`space-y-5 w-[90vw] md:w-[80vw] py-5 flex flex-col items-center ${
        deletingTweet && "animate-pulse"
      }`}
    >
      {/* {for tweet} */}
      {tweet && (
        <article className="flex flex-cols w-[80%] md:w-[60%] min-h-[125px] items-start gap-5 p-3 bg-zinc-700/20 rounded-md relative">
          <Options
            userId={tweet?.ownerInfo?._id}
            deleteHandler={handleDeleteTweet}
            currentItem={tweet?._id}
            tweetEdit={{
              tweet: tweet?.content,
              loading: isEditing,
              tweetId: tweet?._id,
              editHandler: handleEditTweet,
            }}
          />
          {tweet?.ownerInfo && (
            <img
              className="w-[50px] h-[50px] object-cover rounded-[100%]"
              src={tweet?.ownerInfo?.avatar}
              alt=""
            />
          )}

          <section className="grid grid-rows-[auto_1fr] h-[100%] p-1 w-[100%]">
            <div className="flex flex-col gap-1 h-[50px]">
              <span className="flex items-end gap-2">
                {tweet?.ownerInfo && (
                  <h2 className="text-sm md:text-[1.3em] text-sky-500 cursor-pointer">
                    {tweet?.ownerInfo?.username}
                  </h2>
                )}

                <p className="text-[0.65em] md:text-[0.85em]">
                  {time(tweet?.createdAt)}
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
                  <MdMessage
                    cursor="pointer"
                    onClick={() => setComment((cur) => !cur)}
                  />
                  <span className="text-sm">{tweet?.totalCommentsCount}</span>
                </p>
              </div>

              {isComment && <TweetComments tweetId={tweet?._id} />}
            </div>
          </section>
        </article>
      )}
    </div>
  );
}

export default Items;
