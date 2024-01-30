import { Outlet } from "react-router";
import Nav from "./Nav";
import { useCurrentUser } from "../Hooks/authHooks/useGetCurrentUser";
import { useState } from "react";
import Loader from "./loader";
import { useVideo } from "./VideoPlayer";
import Button from "./Button";

function AppLayout() {
   const { removeVideo, video } = useVideo();
   const { currentUser, loadingCurrentUser } = useCurrentUser();
   const [isNav, setIsNav] = useState(false);

   function handleNav() {
      setIsNav((op) => !op);
   }
   function handleCloseNav() {
      setIsNav(false);
   }
   return (
      <>
         {loadingCurrentUser && <Loader />}
         <div
            className={`w-full min-h-[100vh] flex flex-col items-center gap-3 font-Changa relative bg-zinc-800 text-zinc-100 text-md`}
         >
            <Nav
               user={currentUser?.data}
               isNav={isNav}
               setIsNav={handleNav}
               handleCloseNav={handleCloseNav}
            />
            <main className="w-[95vw] flex flex-col items-center animate-slow p-2 pb-[100px]">
               <Outlet />
            </main>

            {/* //Portable videoPlayer */}
            {video && (
               <div className="absolute bottom-2 right-2 w-[500px bg-zinc-900 h-[250px] flex justify-center items-center rounded-lg shadow-lg shadow-zinc-700/50 p-2">
                  <video
                     controlsList="nodownload"
                     src={video}
                     className="bottom-1 right-1 relative"
                     width="400px"
                     controls
                  ></video>{" "}
                  <Button
                     extrastyles="z-[999] w-[20px absolute top-1 right-5 font-bold text-md"
                     onClick={removeVideo}
                  >
                     X
                  </Button>
               </div>
            )}
         </div>
      </>
   );
}

export default AppLayout;
