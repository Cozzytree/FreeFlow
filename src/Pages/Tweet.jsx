import Button from "../Component/Button";
import Items from "../Component/Items";
import TextArea from "../Component/TextArea";
import Loader from "../Component/loader";
import { useGetTweet } from "../Hooks/tweetsHooks/useGetTweets";

function Tweet() {
  const { loadingTweets, allTweets } = useGetTweet();

  return (
    <>
      {loadingTweets && <Loader />}
      <div className="flex gap-2 mb-4">
        <TextArea placeholder="write something..." />
        <Button type="primary">Tweet</Button>
      </div>
      {allTweets?.data?.map((tweet) => (
        <Items key={tweet?._id} tweet={tweet} />
      ))}
    </>
  );
}

export default Tweet;
