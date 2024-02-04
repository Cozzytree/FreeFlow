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
        className={`min-w-[100%] max-h-[250px] p-1 overflow-y-scroll rounded-lg bg-zinc-800`}
      >
        {(isLoading || isPending) && <MiniSpinner />}

        {tweetComments?.pages[0]?.data?.data?.length === 0 && (
          <p>no comments</p>
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
              <h2 className="text-xs md:text-[1.2em] flex flex-col">
                {comment?.user?.username}
                <span className="text-xs md:text-sm px-3 text-zinc-400">
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
