import { useNavigate } from "react-router";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useGetWatchHistory } from "../Hooks/authHooks/useGetWatchHistory";

function WatchHistory() {
   const navigate = useNavigate();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   if (!currentUser && !loadingCurrentUser) {
      navigate("/login");
   }

   const { userWatchHistory, loadingHistory } = useGetWatchHistory();

   return (
      <>
         <h1 className="w-[100%] text-left text-lg md:text-4xl font-medium tracking-wide">
            Watch History
         </h1>
         <div className="w-[90vw] grid grid-cols-[auto_auto_auto] justify-start">
            {loadingHistory && <Loader />}

            {userWatchHistory?.data?.map((v, i) => (
               <VideoItems key={i} v={v.watch_history} />
            ))}
         </div>
      </>
   );
}

export default WatchHistory;
