import Items from "../Component/Items";
import Loader from "../Component/loader";
import TweetComments from "../Component/tweetComments";
import { useGetAtweet } from "../Hooks/tweetsHooks/useGetAtweet";

function TweetInDetail() {
   const { loadingTweet, atweet } = useGetAtweet();
   return (
      <>
         {loadingTweet && <Loader />}
         <Items tweet={atweet?.data} showCommentNo={false} isInfo={true} />
         <TweetComments tweetId={atweet?.data?._id} />
      </>
   );
}

export default TweetInDetail;
