import { Outlet } from "react-router";
import Nav from "./Nav";
import { useState } from "react";
import VideoPlayer, { useVideo } from "./VideoPlayer";
import { useEscapeClose } from "../Hooks/uiHooks/useEscapeClose";
import Search from "./Search";
import { useVideoControls } from "../Hooks/uiHooks/useVideoControls";

function AppLayout() {
   const { video } = useVideo();
   const [isNav, setIsNav] = useState(false);
   const [progress, setProgress] = useState(0);

   useVideoControls(".videoPlayer", setProgress);

   function handleNav() {
      setIsNav((op) => !op);
   }
   function handleCloseNav() {
      setIsNav(false);
   }
   useEscapeClose(handleCloseNav, true);

   return (
      <>
         <div
            className={`w-full min-h-[100vh] grid grid-rows-[auto_1fr] gap-3 font-Changa relative bg-zinc-800 text-zinc-100 text-md`}
         >
            <Search />
            <Nav
               isNav={isNav}
               setIsNav={handleNav}
               handleCloseNav={handleCloseNav}
            />
            <main className="w-[95vw] flex flex-col items-center animate-slow p-2 pl-8 pb-[100px] main">
               <Outlet />
            </main>
            {/* //Portable videoPlayer */}
            {video?.src && (
               <div className="fixed bottom-0 w-[100%] right-0 md:w-[500px] p-0">
                  <VideoPlayer
                     src={video?.src}
                     controlsList="no-download"
                     videoId={video?._id}
                     poster={video?.poster}
                     ct={video?.progress}
                     progress={progress}
                  />
               </div>
            )}
         </div>
      </>
   );
}

export default AppLayout;
