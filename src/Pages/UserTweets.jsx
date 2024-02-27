import Items from "../Component/Items";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import UserView from "../Component/UserView";
import Loader from "../Component/loader";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useGetUserTweets } from "../Hooks/tweetsHooks/useGetUserTweets";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";

function UserTweets() {
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const { userTweets, loadingUserTweets } = useGetUserTweets();
   const { currentUser } = useGetUser();
   useDocumentTitle(currentUser?.data?.username);

   return (
      <>
         {(loadingUserTweets || loadingCurrentUser) && <Loader />}
         <UserView
            userId={cu?.data?._id}
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
