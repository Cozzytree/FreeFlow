import Items from "../Component/Items";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import UserView from "../Component/UserView";
import Loader from "../Component/loader";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useGetUserTweets } from "../Hooks/tweetsHooks/useGetUserTweets";

function UserTweets() {
   const { userTweets, loadingUserTweets } = useGetUserTweets();
   const { currentUser } = useGetUser();
   return (
      <>
         {loadingUserTweets && <Loader />}
         <UserView
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
            type="owner"
         />
         <TweetsVideoToggle />

         {userTweets?.data[0]?.data?.map((twee) => (
            <Items tweet={twee} key={twee?._id} />
         ))}
      </>
   );
}

export default UserTweets;
