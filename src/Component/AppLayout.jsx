import { Outlet } from "react-router";
import Nav from "./Nav";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useGlobalContext } from "../Hooks/context/globalContext";
import { useEscapeClose } from "../Hooks/uiHooks/useEscapeClose";
import Search from "./Search";
import { useVideoControls } from "../Hooks/uiHooks/useVideoControls";

function AppLayout() {
   const { video, handleCloseNav } = useGlobalContext();
   const [progress, setProgress] = useState(0);
   useVideoControls(".videoPlayer", setProgress);
   useEscapeClose(handleCloseNav, true);

   return (
      <>
         <div
            className={`w-full min-h-[100vh] font-MPLUS font-semibold grid grid-rows-[auto_1fr] gap-3 relative bg-zinc-800 text-zinc-100 text-md`}
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
