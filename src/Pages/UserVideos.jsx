import UserView from "../Component/UserView";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useUserVideo } from "../Hooks/videoHooks/useUserVideo";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";

function UserVideos() {
   const { currentUser: cu, loadingCurrentUser } = useCurrentUser();
   const { loadingUser, currentUser } = useGetUser();
   const { userVideos, loadingVideos } = useUserVideo();
   useDocumentTitle(currentUser?.data?.username);
   const { data } = userVideos || [];

   return (
      <>
         {(loadingUser || loadingCurrentUser) && <Loader />}
         <UserView
            userId={cu?.data?._id}
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
         />
         <TweetsVideoToggle />

         <div
            className={`w-[80vw] grid py-3 grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] gap-2 items-center justify-center h-[100%] origin-right transition-all duration-150`}
         >
            {loadingVideos ? (
               "loading..."
            ) : (
               <>
                  {data?.map((v) => (
                     <VideoItems v={v} key={v._id} type="user" />
                  ))}
               </>
            )}
         </div>
      </>
   );
}

export default UserVideos;
