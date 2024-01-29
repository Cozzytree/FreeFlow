import { useEffect, useState } from "react";
import UserView from "../Component/UserView";
import VideoItems from "../Component/VideoItems";
import Loader from "../Component/loader";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useUserVideo } from "../Hooks/videoHooks/useUserVideo";

function UserVideos() {
   const [isVideo, setVideo] = useState("videos");
   const { loadingUser, currentUser } = useGetUser();
   const { userVideos, loadingVideos } = useUserVideo();
   useEffect(() => {
      const url = document.URL.split("/");
      setVideo(url[url.length - 1]);
   }, []);
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
         <nav className="w-[100%] px-8 pt-5 border-b-[0.5px] border-zinc-700">
            <ul className="style-none flex gap-10 ">
               <li
                  className={`cursor-pointer ${
                     isVideo === "videos" && "border-b-[1px] border-b-zinc-100"
                  } `}
               >
                  Videos
               </li>
               <li
                  className={`cursor-pointer ${
                     isVideo === "tweets" && "border-b-[1px] border-b-zinc-100"
                  } `}
               >
                  Tweets
               </li>
            </ul>
         </nav>

         <div
            className={`w-[80vw] grid py-3 sm:grid-cols-[1fr_1fr] justify-center h-[100%] origin-right transition-all duration-150
                    ${isVideo ? "translate-x-0" : "translate-x-[-80vw]"}`}
         >
            {data?.map((v) => (
               <VideoItems v={v} key={v._id} type="user" />
            ))}
         </div>
      </>
   );
}

export default UserVideos;
