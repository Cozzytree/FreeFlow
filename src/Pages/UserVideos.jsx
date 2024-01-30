import UserView from "../Component/UserView";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useUserVideo } from "../Hooks/videoHooks/useUserVideo";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";

function UserVideos() {
   const { loadingUser, currentUser } = useGetUser();
   const { userVideos, loadingVideos } = useUserVideo();

   const { data } = userVideos || [];
   return (
      <>
         {(loadingUser || loadingVideos) && <Loader />}
         <UserView
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
         />
         <TweetsVideoToggle />

         <div
            className={`w-[80vw] grid py-3 sm:grid-cols-[1fr_1fr] justify-center h-[100%] origin-right transition-all duration-150`}
         >
            {data?.map((v) => (
               <VideoItems v={v} key={v._id} type="user" />
            ))}
         </div>
      </>
   );
}

export default UserVideos;
