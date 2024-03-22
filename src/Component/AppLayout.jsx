import Nav from "./Nav";
import Search from "./Search";
import VideoPlayer from "./VideoPlayer";
import MiniSpinner from "./MiniSpinner";
import { Outlet } from "react-router";
import { useState } from "react";
import { useGlobalContext } from "../Hooks/context/globalContext";
import { useEscapeClose } from "../Hooks/uiHooks/useEscapeClose";
import { useVideoControls } from "../Hooks/uiHooks/useVideoControls";

function AppLayout() {
   const { video, handleCloseNav, globalLoading } = useGlobalContext();
   const [progress, setProgress] = useState(0);
   useVideoControls(".videoPlayer", setProgress);
   useEscapeClose(handleCloseNav, true);

   return (
      <>
         {globalLoading && (
            <span className="fixed right-10 z-[100] text-zinc-100">
               Uploading... <MiniSpinner />
            </span>
         )}
         <div
            className={`w-full min-h-[100vh] font-MPLUS font-semibold grid grid-rows-[auto_1fr] gap-3 relative bg-[rgba(0,0,0,0.93)] text-zinc-100 text-md scroll-smooth`}
         >
            <Search />
            <Nav />
            <main className="w-[95vw] z-10 flex flex-col items-center animate-slow p-2 pl-8 pb-[100px] main">
               <Outlet />
            </main>
            {/* //Portable videoPlayer */}
            {video?.src && (
               <div className="fixed p-3 bottom-0 w-[100%] right-0 md:w-[500px] z-20">
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
