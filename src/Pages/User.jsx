import UserView from "../Component/UserView";
import Loader from "../Component/loader";
import TweetsVideoToggle from "../Component/TweetsVideoToggle";
import { useGetUser } from "../Hooks/authHooks/useGetUser";
import { useDocumentTitle } from "../Hooks/uiHooks/useDocumentTitle";
import { Outlet, useParams } from "react-router";
import { useEffect, useState } from "react";

function UserVideos() {
   const [pathName, setPathName] = useState("videos");
   const { loadingUser, currentUser, refetch } = useGetUser();
   const params = useParams();
   useDocumentTitle(currentUser?.data?.username);

   useEffect(() => {
      const newPathName = document.URL.split("/").pop();
      setPathName(() => newPathName);
   }, [document.URL]);

   useEffect(() => {
      refetch();
   }, [refetch, params?.userId]);

   return (
      <>
         {loadingUser && <Loader />}
         <UserView
            params={params}
            bio={currentUser?.data?.bio}
            username={currentUser?.data?.username}
            avatar={currentUser?.data?.avatar}
            subcribersCount={currentUser?.data?.subcribersCount}
            totalVideos={currentUser?.data?.totalVideos}
            isSubscribed={currentUser?.data?.isSubscribed}
         />
         <TweetsVideoToggle params={params} pathName={pathName} />
         <div
            className={`w-[90vw] ${
               pathName === "videos" &&
               "grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr]"
            } ${
               pathName === "tweets" && "flex flex-col"
            } justify-center gap-1 pt-4`}
         >
            <Outlet />
         </div>
      </>
   );
}

export default UserVideos;
