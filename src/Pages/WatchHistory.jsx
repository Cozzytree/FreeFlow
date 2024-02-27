import { useNavigate } from "react-router";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useGetWatchHistory } from "../Hooks/authHooks/useGetWatchHistory";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import Button from "../Component/Button";
import { useClearWHistory } from "../Hooks/authHooks/useClearHistory";

function WatchHistory() {
   const navigate = useNavigate();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   const { cWatchHistory, isClearing } = useClearWHistory();
   useDocumentTitle("Watch History");
   if (!currentUser && !loadingCurrentUser) {
      navigate("/login");
   }

   const { userWatchHistory, loadingHistory } = useGetWatchHistory();

   return (
      <>
         <h1 className="w-[80%] text-left text-2xl md:text-4xl font-medium tracking-wide">
            Watch History
         </h1>
         {userWatchHistory?.data?.length >= 1 && (
            <Button
               onClick={cWatchHistory}
               disabled={isClearing}
               extrastyles="absolute top-15 right-5 text-xs"
               type="danger"
            >
               Clear History
            </Button>
         )}

         <div className="w-[90vw] grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] justify-center">
            {loadingHistory && <Loader />}

            {userWatchHistory?.data?.map((v, i) => (
               <VideoItems key={i} v={v.watch_history} />
            ))}
         </div>
      </>
   );
}

export default WatchHistory;
